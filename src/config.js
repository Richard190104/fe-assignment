/**
 * Application Configuration
 */

export const CONFIG = {
    API_BASE_URL: "https://fe-assignment-api.ygnaaac.deno.net",
    _TEST_MODE: "static",
    // Available test modes:
    // static
    // responsive
    // responsive-empty
    // responsive-partial-empty
    // responsive-many-products
    // responsive-many-categories
    // responsive-random
    // Development mode - caches API responses locally
    DEV_MODE: false, // Set to false for production
    DEV_CACHE_DURATION: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};
