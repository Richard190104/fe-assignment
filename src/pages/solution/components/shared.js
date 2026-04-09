import { html } from "lit-html";

export const MAX_SUBCATEGORIES_PER_CATEGORY = 8;

export const getShortenText = (text, maxLength) => {
    if (typeof text !== "string") {
        return text;
    }

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength)}...`;
};

export const calculatePercentageDiscount = (originalPrice, salePrice, asNumber) => {
    const safeOriginalPrice = asNumber(originalPrice, Number.NaN);
    const safeSalePrice = asNumber(salePrice, Number.NaN);

    if (!Number.isFinite(safeOriginalPrice) || !Number.isFinite(safeSalePrice) || safeOriginalPrice <= 0) {
        return null;
    }

    return Math.round(((safeOriginalPrice - safeSalePrice) / safeOriginalPrice) * 100);
};

export const emptyState = (title, description = "Skúste prosím obnoviť stránku.", className = "") => html`
    <div class="c-empty-state ${className}">
        <h3 class="c-empty-state__title">${title}</h3>
        <p class="c-empty-state__description">${description}</p>
    </div>
`;
