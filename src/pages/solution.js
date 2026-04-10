import { html } from "lit-html";
import { loadData } from "../dataLoader.js";
import { form } from "./solution/components/modal.js";
import { notification } from "./solution/components/notification.js";
import { asNumber, asText, formatCurrency } from "../utils/display.js";
import { solutionBanner, solutionCta } from "./solution/components/bannerSection.js";
import { solutionProductCard } from "./solution/components/productSection.js";
import { solutionCategories } from "./solution/components/categorySection.js";
import { emptyState } from "./solution/components/shared.js";

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

const handleCtaClick = () => {
    openModal();
};

const handleModalBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const handleBannerClick = () => {
    console.log("Banner button clicked");
};

const handleQuantityChange = (product, change) => {
    const quantityInput = document.getElementById(`${product.id}-quantity`);
    if (!quantityInput) {
        return;
    }

    let currentQuantity = Number.parseInt(quantityInput.value, 10);
    currentQuantity += change;

    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    quantityInput.value = currentQuantity;
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
        return;
    }

    const message = !Number.isInteger(quantity) || quantity <= 0
        ? "Zvoľte platné množstvo aspoň 1 ks."
        : "Maximálne množstvo pre tento produkt je 10 ks.";

    showNotification({
        title: "Produkt sa nepodarilo pridať",
        message,
        type: "error",
    });
};

const handleFormSubmitSuccess = ({ title, message, type }) => {
    showNotification({
        title,
        message,
        type,
        duration: 3200,
    });
};

const renderProductsBlock = (products = []) => {
    if ((products?.length ?? 0) === 0) {
        return emptyState("Could not load products.", "", "c-empty-state--products");
    }

    return products.map((product) =>
        solutionProductCard(
            product,
            {
                onAddToCart: handleAddToCart,
                onIncreaseQuantity: (item) => handleQuantityChange(item, 1),
                onDecreaseQuantity: (item) => handleQuantityChange(item, -1),
            },
            { asNumber, asText, formatCurrency }
        )
    );
};

export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    return html`
        <div class="l-solution">
            <div class="l-solution__banner">
                <div class="l-container">
                    ${data.banner
                        ? solutionBanner(data.banner, { onBannerClick: handleBannerClick })
                        : emptyState("Something went wrong.", "Could not load banner.", "c-empty-state--banner")}
                </div>
            </div>

            <div class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__products">
                            <div class="c-solution-content__banner">
                                ${data.ctaBanner
                                    ? solutionCta(data.ctaBanner, { onCtaClick: handleCtaClick })
                                    : emptyState("Something went wrong.", "Could not load CTA banner.", "c-empty-state--cta")}
                            </div>
                            ${renderProductsBlock(data.products)}
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-solution__categories">
                <div class="l-container is-shorter">
                    ${solutionCategories(data.categories || [], { asNumber, asText, emptyState })}
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

export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();
        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};
