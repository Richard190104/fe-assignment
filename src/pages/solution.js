import { html } from "lit-html";
import { loadData } from "../dataLoader.js";
import { rating } from "../components/productRating.js";
import cartIcon from "../assets/images/cart-icon.svg";
import { form } from "../components/modal.js";
import { notification } from "../components/notification.js";
import { asNumber, asText, formatCurrency } from "../utils/display.js";
/**
 * Solution Page
 */

let notificationTimeoutId;

const showNotification = ({ title, message, type = "success", duration = 3000 }) => {
    const notificationElement = document.querySelector(".c-notification");
    const titleNode = notificationElement?.querySelector(".c-notification__title");
    const messageNode = notificationElement?.querySelector(".c-notification__message");

    if (!notificationElement || !titleNode || !messageNode) {
        return;
    }

    notificationElement.classList.remove("is-success", "is-error");
    notificationElement.classList.add(type === "error" ? "is-error" : "is-success");

    titleNode.textContent = title;
    messageNode.textContent = message;

    notificationElement.classList.add("is-visible");
    window.clearTimeout(notificationTimeoutId);
    notificationTimeoutId = window.setTimeout(() => {
        notificationElement.classList.remove("is-visible");
    }, duration);
};

const openModal = () => {
    const modalElement = document.querySelector(".c-modal");
    modalElement?.removeAttribute("hidden");
    modalElement?.classList.add("is-open");

    window.setTimeout(() => {
        const firstInput = modalElement?.querySelector(".c-modal-form__field-input");
        firstInput?.focus();
    }, 0);
};

const closeModal = () => {
    const modalElement = document.querySelector(".c-modal");
    modalElement?.classList.remove("is-open");
    modalElement?.setAttribute("hidden", "");
};

// CTA button click handler
const handleCtaClick = () => {
    openModal();
};

const handleModalBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

// Banner button click handler
const handleBannerClick = () => {
    console.log("Banner button clicked");
    // TODO: Navigate to products or filter
};

const handleAddToCart = (product) => {
    const quantityInput = document.getElementById(`${product.id}-quantity`);

    const quantity = Number.parseInt(quantityInput?.value, 10);
    const isSuccess = Number.isInteger(quantity) && quantity > 0 && quantity <= 10;

    if (isSuccess) {
        showNotification({
            title: "Produkt pridaný do košíka",
            message: `${product.name} (${quantity} ks)`,
            type: "success",
        });
    } else {
        let message = "Zvoľte platné množstvo aspoň 1 ks.";
        if (!Number.isInteger(quantity) || quantity <= 0) {
            message = "Zvoľte platné množstvo aspoň 1 ks.";
        } else {
            message = "Maximálne množstvo pre tento produkt je 10 ks.";
        }

        showNotification({
            title: "Produkt sa nepodarilo pridať",
            message,
            type: "error",
        });
    }
};

const handleFormSubmitSuccess = ({ title, message, type }) => {
    showNotification({
        title,
        message,
        type,
        duration: 3200,
    });
};

const calculatePercentageDiscount = (originalPrice, salePrice) => {
    const safeOriginalPrice = asNumber(originalPrice, Number.NaN);
    const safeSalePrice = asNumber(salePrice, Number.NaN);

    if (
        !Number.isFinite(safeOriginalPrice) ||
        !Number.isFinite(safeSalePrice) ||
        safeOriginalPrice <= 0
    ) {
        return null;
    }
    const discount = ((safeOriginalPrice - safeSalePrice) / safeOriginalPrice) * 100;
    return Math.round(discount);
};

const productTag = (product) => html`
    <div class="c-product-tag">
        <span class="c-product-tag__text"
            >-${calculatePercentageDiscount(product.originalPrice, product.salePrice)}%</span
        >
    </div>
    ${asText(product.id) === "1"
        ? html`<div class="c-product-tag-new">
              <span class="c-product-tag__text">Novinka</span>
          </div>`
        : ""}
`;

function handleQuantityChange(product, change) {
    const quantityInput = document.getElementById(`${product.id}-quantity`);
    if (!quantityInput) {
        return;
    }

    let currentQuantity = parseInt(quantityInput.value, 10);
    currentQuantity += change;
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }
    quantityInput.value = currentQuantity;
}

// Solution main banner
const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div
            class="c-solution-banner__image"
            style="background-image: url(${banner.imageUrl})"
        ></div>
        <div class="c-solution-banner__overlay"></div>
        <div class="c-solution-banner__content">
            <h1 class="c-solution-banner__content__title">${banner.title}</h1>
            <div class="c-solution-banner__content__description">${banner.description}</div>
            <button class="c-solution-banner__content__button" @click=${() => handleBannerClick()}>
                <span class="sb-text">${banner.ctaText}</span>
                <svg
                    class="sb-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
`;

const getShortenText = (text, maxLength) => {
    if (typeof text !== "string") {
        return text;
    }
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "...";
};

const emptyState = (title, description = "Skúste prosím obnoviť stránku.", className = "") => html`
    <div class="c-empty-state ${className}">
        <h3 class="c-empty-state__title">${title}</h3>
        <p class="c-empty-state__description">${description}</p>
    </div>
`;

const solutionProductCard = (product) => html`
    <div class="c-solution-product-card">
        <div class="c-solution-product-card__content">
            <div class="c-solution-product-card__content__image-wrapper">
                <img
                    class="c-solution-product-card__content__image"
                    src="${product.imageUrl}"
                    alt="${asText(product.name, "Produkt")}"
                />
            </div>
            <div class="c-solution-product-card__content__info">
                ${Number.isFinite(asNumber(product.rating, Number.NaN))
                    ? rating(product.rating, product.reviewCount)
                    : "Hodnotenia nie sú k dispozícii"}
                <h3 class="c-solution-product-card__content__title">
                    ${getShortenText(product.name, 25)}
                </h3>
                <p class="c-solution-product-card__content__gray">
                    ${asText(getShortenText(product.sku, 25), "SKU nie je k dispozícii")}
                </p>
                <div class="c-solution-product-card__content__prices">
                    <del class="c-solution-product-card__content__original-price"
                        >${formatCurrency(product.originalPrice, product.currency)}</del
                    >
                    <p>
                        <data
                            class="c-solution-product-card__content__current-price"
                            value="${asNumber(product.salePrice, 0)}"
                        >
                            ${formatCurrency(product.salePrice, product.currency)}
                        </data>
                    </p>
                    <p class="c-solution-product-card__content__gray">
                        ${formatCurrency(product.priceWithoutVAT, product.currency)} bez DPH
                    </p>
                    <p class="c-solution-product-card__content__green">
                        ${asText(getShortenText(product.stock, 27), "Žiadne dostupné informácie")}
                    </p>
                </div>

                <div class="c-solution-product-card__content__actions">
                    <div class="c-solution-product-card__content__actions__quantity">
                        <button
                            class="c-solution-product-card__content__actions__quantity__button"
                            @click=${() => handleQuantityChange(product, -1)}
                        >
                            -
                        </button>
                        <input type="number" min="1" value="1" id="${product.id}-quantity" />
                        <button
                            class="c-solution-product-card__content__actions__quantity__button"
                            @click=${() => handleQuantityChange(product, 1)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        class="c-solution-product-card__content__actions__cart-button"
                        @click=${() => handleAddToCart(product)}
                    >
                        <img
                            class="c-solution-product-card__content__actions__cart-icon"
                            src="${cartIcon}"
                            alt=""
                            aria-hidden="true"
                        />
                        <span>Do košíka</span>
                    </button>
                </div>
            </div>
        </div>
        ${product.originalPrice && product.salePrice ? productTag(product) : ""}
    </div>
`;

const MAX_SUBCATEGORIES_PER_CATEGORY = 8;

const solutionCategoryCard = (category) => html`
    <article class="c-solution-category-card">
        <div
            class="c-solution-category-card__image"
            style="background-image: url(${category.imageUrl})"
        ></div>
        <div class="c-solution-category-card__overlay"></div>
        <div class="c-solution-category-card__content">
            <div class="c-solution-category-card__header">
                <h3 class="c-solution-category-card__title">
                    ${asText(getShortenText(category.name, 50), "Kategória bez názvu")}
                </h3>
                <span class="c-solution-category-card__count"
                    >${asNumber(category.productCount, 0)}</span
                >
            </div>

            <ul class="c-solution-category-card__list">
                ${(category.subcategories || []).slice(0, MAX_SUBCATEGORIES_PER_CATEGORY).map(
                    (subcategory) => html`
                        <li class="c-solution-category-card__item">
                            <a
                                href="${subcategory.link || "#"}"
                                class="c-solution-category-card__sublink"
                                >${asText(getShortenText(subcategory.name, 50), "Bez názvu")}</a
                            >
                        </li>
                    `
                )}
            </ul>

            <a href="${category.link || "#"}" class="c-solution-category-card__link">
                ${asText(category.ctaText, "Zobraziť viac")}
                <span aria-hidden="true">→</span>
            </a>
        </div>
    </article>
`;

const solutionCategories = (categories = []) => html`
    <section class="c-solution-categories">
        <h2 class="c-solution-categories__title">Top kategórie produktov</h2>
        ${categories.length > 0
            ? html`<div class="c-solution-categories__grid">
                  ${categories.map(solutionCategoryCard)}
              </div>`
            : emptyState("Could not load categories.", "", "c-empty-state--categories")}
    </section>
`;

// Solution CTA section
const solutionCta = (ctaBanner) => html`
    <div class="c-solution-cta">
        <div
            class="c-solution-cta__image"
            style="background-image: url(${ctaBanner.imageUrl})"
        ></div>

        <div class="c-solution-cta__overlay"></div>

        <div class="c-solution-cta__content">
            <h2 class="c-solution-cta__content__title">${ctaBanner.title}</h2>

            <div class="c-solution-cta__content__description">${ctaBanner.description}</div>

            <button class="c-solution-cta__content__button" @click=${() => handleCtaClick()}>
                <span class="sc-text">${ctaBanner.ctaText}</span>

                <svg
                    class="sc-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
        <div>
            <p>
                *This is a demo CTA. In a real application, clicking the button would open an email
                form or modal.
            </p>
        </div>
    </div>
`;

// Main page template
export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    console.log("data.banner:\n", data.banner);
    console.log("data.ctaBanner:\n", data.ctaBanner);
    console.log("data.products:\n", data.products);
    console.log("data.categories:\n", data.categories);

    return html`
        <div class="l-solution">
            <div class="l-solution__banner">
                <div class="l-container">
                    ${data.banner
                        ? solutionBanner(data.banner)
                        : emptyState(
                              "Something went wrong.",
                              "Could not load banner.",
                              "c-empty-state--banner"
                          )}
                </div>
            </div>

            <div class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__products">
                            <div class="c-solution-content__banner">
                                ${data.ctaBanner
                                    ? solutionCta(data.ctaBanner)
                                    : emptyState(
                                          "Something went wrong.",
                                          "Could not load CTA banner.",
                                          "c-empty-state--cta"
                                      )}
                            </div>
                            ${(data.products?.length ?? 0) > 0
                                ? data.products.map(solutionProductCard)
                                : emptyState(
                                      "Could not load products.",
                                      "",
                                      "c-empty-state--products"
                                  )}
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-solution__categories">
                <div class="l-container  is-shorter">
                    ${solutionCategories(data.categories || [])}
                </div>
            </div>

            ${form({
                title: "Tajná ponuka produktov Dewalt len pre vás",
                isOpen: false,
                onClose: closeModal,
                onBackdropClick: handleModalBackdropClick,
                onSuccess: handleFormSubmitSuccess,
            })}
            ${notification("", "", "success")}
        </div>
    `;
};

/**
 * Load data and render the solution page
 */
export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();
        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};
