import { CONFIG } from "./config.js";

import mainBannerImage from "./assets/images/main-banner.jpg";
import secretOfferBannerImage from "./assets/images/secret-offer-banner.jpg";
import productDewaltImage from "./assets/images/product-dewalt.png";
import productMetaboImage from "./assets/images/product-metabo.png";
import categoryAccImage from "./assets/images/product-categories-acc..jpg";
import categoryCleaningImage from "./assets/images/product-categories-cleaning.jpg";
import categoryElectricToolsImage from "./assets/images/product-categories-electric-tools.jpg";
import categoryGardenImage from "./assets/images/product-categories-garden.jpg";
import categoryToolsImage from "./assets/images/product-categories-tools.jpg";

const CACHE_KEY = "fe_assignment_data_cache_v2";
const CACHE_TIMESTAMP_KEY = "fe_assignment_data_timestamp_v2";

const PRODUCT_LOCAL_IMAGES = [productDewaltImage, productMetaboImage];
const CATEGORY_LOCAL_IMAGES = [
    categoryElectricToolsImage,
    categoryGardenImage,
    categoryCleaningImage,
    categoryToolsImage,
    categoryAccImage,
];

const withForcedLocalImage = (item, localImage) => {
    if (!item || typeof item !== "object") {
        return item;
    }

    return localImage ? { ...item, imageUrl: localImage } : item;
};

/**
 * Check if cached data is still valid
 */
const isCacheValid = () => {
    if (!CONFIG.DEV_MODE) {
        return false;
    }

    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) {
        return false;
    }

    const cacheAge = Date.now() - parseInt(timestamp, 10);
    return cacheAge < CONFIG.DEV_CACHE_DURATION;
};

/**
 * Get cached data from localStorage
 */
const getCachedData = () => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : null;
    } catch (error) {
        console.warn("[Data Loader] Failed to parse cached data:", error);
        return null;
    }
};

/**
 * Save data to localStorage cache
 */
const setCachedData = (data) => {
    if (!CONFIG.DEV_MODE) {
        return;
    }

    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
        console.warn("[Data Loader] Failed to cache data:", error);
    }
};

/**
 * Load data from API
 *
 * @returns {Promise<Object>} Data object with banner, ctaBanner, products, categories
 */
export const loadData = async () => {
    // Check cache first in DEV mode
    if (CONFIG.DEV_MODE && isCacheValid()) {
        const cachedData = getCachedData();
        if (cachedData) {
            console.log("[Data Loader] Using cached data (DEV mode)");
            return cachedData;
        }
    }

    const mode = CONFIG._TEST_MODE || "static";
    const modeParam = mode === "static" ? "" : `?mode=${mode}`;

    try {
        console.log("[Data Loader] Fetching fresh data from API...");
        const [banner, ctaBanner, products, categories] = await Promise.all([
            fetch(`${CONFIG.API_BASE_URL}/banner${modeParam}`).then((r) => r.json()),
            fetch(`${CONFIG.API_BASE_URL}/cta-banner${modeParam}`).then((r) => r.json()),
            fetch(`${CONFIG.API_BASE_URL}/products${modeParam}`).then((r) => r.json()),
            fetch(`${CONFIG.API_BASE_URL}/categories${modeParam}`).then((r) => r.json()),
        ]);

        const data = {
            banner: withForcedLocalImage(banner.data, mainBannerImage),
            ctaBanner: withForcedLocalImage(ctaBanner.data, secretOfferBannerImage),
            products: Array.isArray(products.data)
                ? products.data.map((item, index) => withForcedLocalImage(item, PRODUCT_LOCAL_IMAGES[index]))
                : [],
            categories: Array.isArray(categories.data)
                ? categories.data.map((item, index) => withForcedLocalImage(item, CATEGORY_LOCAL_IMAGES[index]))
                : [],
        };

        // Cache data in DEV mode
        setCachedData(data);

        return data;
    } catch (error) {
        console.error("[Data Loader] Failed to load data from API:", error);
        throw error;
    }
};

/**
 * Clear cached data (useful for development)
 */
export const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    console.log("[Data Loader] Cache cleared");
};

/**
 * Log data source info to console
 */
export const logDataMode = () => {
    console.log(`[Data Loader] API: ${CONFIG.API_BASE_URL}`);
    if (CONFIG.DEV_MODE) {
        console.log(
            `[Data Loader] DEV mode: ON (cache duration: ${CONFIG.DEV_CACHE_DURATION / 1000 / 60} minutes)`
        );
        console.log(`[Data Loader] To clear cache, run: clearCache()`);
        // Make clearCache available in console
        window.clearCache = clearCache;
    } else {
        console.log(`[Data Loader] DEV mode: OFF`);
    }
};
