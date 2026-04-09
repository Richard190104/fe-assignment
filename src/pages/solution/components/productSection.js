import { html } from "lit-html";
import { rating } from "../../../components/productRating.js";
import cartIcon from "../../../assets/images/cart-icon.svg";
import { calculatePercentageDiscount, getShortenText } from "./shared.js";

const productTag = (product, { asNumber, asText }) => {
    const discount = calculatePercentageDiscount(product.originalPrice, product.salePrice, asNumber);

    return html`
        <div class="c-product-tag">
            <span class="c-product-tag__text">-${discount}%</span>
        </div>
        ${asText(product.id) === "1"
            ? html`<div class="c-product-tag-new"><span class="c-product-tag__text">Novinka</span></div>`
            : ""}
    `;
};

export const solutionProductCard = (
    product,
    { onAddToCart, onIncreaseQuantity, onDecreaseQuantity },
    { asNumber, asText, formatCurrency }
) => html`
    <div class="c-solution-product-card">
        <div class="c-solution-product-card__content">
            <div class="c-solution-product-card__content__image-wrapper">
                <img class="c-solution-product-card__content__image" src="${product.imageUrl}" alt="${asText(product.name, "Produkt")}" />
            </div>
            <div class="c-solution-product-card__content__info">
                ${Number.isFinite(asNumber(product.rating, Number.NaN))
                    ? rating(product.rating, product.reviewCount)
                    : "Hodnotenia nie sú k dispozícii"}
                <h3 class="c-solution-product-card__content__title">${getShortenText(product.name, 25)}</h3>
                <p class="c-solution-product-card__content__gray">${asText(getShortenText(product.sku, 25), "SKU nie je k dispozícii")}</p>
                <div class="c-solution-product-card__content__prices">
                    <del class="c-solution-product-card__content__original-price">${formatCurrency(product.originalPrice, product.currency)}</del>
                    <p>
                        <data class="c-solution-product-card__content__current-price" value="${asNumber(product.salePrice, 0)}">
                            ${formatCurrency(product.salePrice, product.currency)}
                        </data>
                    </p>
                    <p class="c-solution-product-card__content__gray">${formatCurrency(product.priceWithoutVAT, product.currency)} bez DPH</p>
                    <p class="c-solution-product-card__content__green">${asText(getShortenText(product.stock, 27), "Žiadne dostupné informácie")}</p>
                </div>

                <div class="c-solution-product-card__content__actions">
                    <div class="c-solution-product-card__content__actions__quantity">
                        <button class="c-solution-product-card__content__actions__quantity__button" @click=${() => onDecreaseQuantity(product)}>-</button>
                        <input type="number" min="1" value="1" id="${product.id}-quantity" />
                        <button class="c-solution-product-card__content__actions__quantity__button" @click=${() => onIncreaseQuantity(product)}>+</button>
                    </div>
                    <button class="c-solution-product-card__content__actions__cart-button" @click=${() => onAddToCart(product)}>
                        <img class="c-solution-product-card__content__actions__cart-icon" src="${cartIcon}" alt="" aria-hidden="true" />
                        <span>Do košíka</span>
                    </button>
                </div>
            </div>
        </div>
        ${product.originalPrice && product.salePrice ? productTag(product, { asNumber, asText }) : ""}
    </div>
`;
