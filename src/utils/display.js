export const asText = (value, fallback = "") => {
    if (value === null || value === undefined) {
        return fallback;
    }

    if (typeof value === "string") {
        return value.trim() || fallback;
    }

    return String(value);
};

export const asNumber = (value, fallback = 0) => {
    const parsed = typeof value === "number" ? value : Number.parseFloat(String(value).replace(/,/g, "."));
    return Number.isFinite(parsed) ? parsed : fallback;
};

const acceptedCurrencies = ["€", "EUR", "$", "USD", "£", "GBP"];

export const formatCurrency = (value, currency = "€", fallback = "Cena nie je k dispozícii") => {
    const numericValue = asNumber(value, Number.NaN);
    if (!Number.isFinite(numericValue)) {
        return fallback;
    }
    if (!acceptedCurrencies.includes(currency)) {
        currency = "(?)";
    }
    return `${numericValue.toFixed(2)} ${asText(currency, "€")}`;
};
