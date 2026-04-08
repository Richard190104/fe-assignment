import { html } from "lit-html";
import { loadData } from "../dataLoader.js";
import {rating} from "../components/productRating.js";
/**
 * Solution Page
 */

// CTA button click handler
const handleCtaClick = () => {
    console.log("CTA button clicked");
    // TODO: Implement email form/modal
};

// Banner button click handler
const handleBannerClick = () => {
    console.log("Banner button clicked");
    // TODO: Navigate to products or filter
};

// Solution main banner
const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div class="c-solution-banner__image" style="background-image: url(${banner.imageUrl})"></div>
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

const solutionProductCard = (product) => html`
    <div class="c-solution-product-card">
        <div class="c-solution-product-card__content">
            <div class="c-solution-product-card__content__image-wrapper">
                <img class="c-solution-product-card__content__image" src="${product.imageUrl}" alt="${product.name}" />
            </div>
            <div class="c-solution-product-card__content__info">
                ${product.rating ? rating(product.rating, product.reviewCount) : ""}
                <h3 class="c-solution-product-card__content__title">${product.name}</h3>
                <p>${product.sku}</p>
                <s>${product.originalPrice} €</s>
                <p>${product.salePrice} €</p>
                <p>${product.priceWithoutVAT} €</p>
                <p>${product.stock}</p>
                <div class="c-solution-product-card__content__actions">
                    <div>
                        <button>-</button>
                        <input type="number" min="1" value="1" />
                        <button>+</button>

                    </div>
                    <button > Do košíka</button>
                </div>
            </div>
            
        </div>
    </div>
`;  

const solutionCategoryCard = (category, index) => html`
    <article class="c-solution-category-card ${index === 4 ? "is-tall" : ""}">
        <div class="c-solution-category-card__image" style="background-image: url(${category.imageUrl})"></div>
        <div class="c-solution-category-card__overlay"></div>
        <div class="c-solution-category-card__content">
            <div class="c-solution-category-card__header">
                <h3 class="c-solution-category-card__title">${category.name}</h3>
                <span class="c-solution-category-card__count">${category.productCount}</span>
            </div>

            <ul
                class="c-solution-category-card__list ${category.subcategories?.length > 3
                    ? "is-two-columns"
                    : ""}"
            >
                ${(category.subcategories || []).slice(0, 9).map(
                    (subcategory) => html`
                        <li class="c-solution-category-card__item">
                            <a href="${subcategory.link}" class="c-solution-category-card__sublink"
                                >${subcategory.name}</a
                            >
                        </li>
                    `
                )}
            </ul>

            <a href="${category.link}" class="c-solution-category-card__link">
                ${category.ctaText}
                <span aria-hidden="true">→</span>
            </a>
        </div>
    </article>
`;

const solutionCategories = (categories = []) => html`
    <section class="c-solution-categories">
        <h2 class="c-solution-categories__title">Top kategórie produktov</h2>
        <div class="c-solution-categories__grid">${categories.map(solutionCategoryCard)}</div>
    </section>
`;

// Solution CTA section
const solutionCta = (ctaBanner) => html`
        <div class="c-solution-cta">
            <div class="c-solution-cta__image" style="background-image: url(${ctaBanner.imageUrl})"></div>

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
                <p>*This is a demo CTA. In a real application, clicking the button would open an email form or modal.</p>
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
                <div class="l-container">${data.banner ? solutionBanner(data.banner) : html``}</div>
            </div>

            <div class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? solutionCta(data.ctaBanner) : html``}
                        </div>
                            
                        <div class="c-solution-content__products">
                            ${data.products?.map(solutionProductCard) || html``}
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-solution__categories">
                <div class="l-container  is-shorter">
                    ${solutionCategories(data.categories || [])}
                </div>
            </div>
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
