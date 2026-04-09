const createVariantLabel = (index) => String(index + 1).padStart(2, "0");

const scalePrice = (price, factor) => Number((price * factor).toFixed(1));

const LONG_DESCRIPTION =
    "Tento produkt má dlhší testovací popis, aby sa overilo zalamovanie textu, výška kariet a správanie rozloženia pri rôznych dĺžkach obsahu na menších aj väčších obrazovkách.";

const LONG_BANNER_TEXT =
    "Mega výpredaj vŕtačiek a náradia Metabo, DeWalt a ďalších značiek. Testovacga výpredaj vŕtačiek a náradia Metabo, DeWalt a ďalších značiek. Testovaga výpredaj vŕtačiek a náradia Metabo, DeWalt a ďalších značiek. Testovaga výpredaj vŕtačiek a náradia Metabo, DeWalt a ďalších značiek. Testovaga výpredaj vŕtačiek a náradia Metabo, DeWalt a ďalších značiek. Testovaga výpredaj vŕtačiek a náradia Metabo, DeWalt a ďalších značiek. Testovaí obsah je zámerne dlhší, aby sa overilo správanie layoutu pri zalamovaní textu, okrajov a CTA komponentov na mobile aj tablete.";

const MIXED_TEXT_VALUE = 42;
const MIXED_NUMERIC_STRING = "129,8";

const createProductVariant = (product, index) => {
    const factor = 1 + (index % 4) * 0.08;
    const variantLabel = createVariantLabel(index);
    const shouldUseLongName = index % 5 === 0;
    const shouldHideStock = index % 7 === 0;
    const shouldDropRating = index % 6 === 0;
    const shouldDropPrices = index % 11 === 0;
    const shouldUseStringPrice = index % 3 === 0;
    const shouldUseNumericSku = index % 8 === 0;
    const shouldUseNumericName = index % 9 === 0;

    return {
        ...product,
        id: `${product.id}-${variantLabel}`,
        name: shouldUseNumericName
            ? MIXED_TEXT_VALUE
            : shouldUseLongName
              ? `${product.name} ${variantLabel} s extra dlhým názvom pre testovanie responsivity a zalamovania textu extra dlhým názvom pre testovanie responsivity a zalamovania textu extra dlhým názvom pre testovanie responsivity a zalamovania textu`
              : `${product.name} ${variantLabel}`,
        sku: shouldUseNumericSku ? 9000 + index : `${product.sku}-${variantLabel}`,
        description: index % 4 === 0 ? LONG_DESCRIPTION : MIXED_TEXT_VALUE,
        originalPrice: shouldDropPrices
            ? null
            : shouldUseStringPrice
              ? `${scalePrice(product.originalPrice, factor)}`
              : scalePrice(product.originalPrice, factor),
        salePrice: shouldDropPrices
            ? null
            : shouldUseStringPrice
              ? MIXED_NUMERIC_STRING
              : scalePrice(product.salePrice, factor),
        priceWithoutVAT: shouldDropPrices
            ? null
            : index % 10 === 0
              ? MIXED_NUMERIC_STRING
              : scalePrice(product.priceWithoutVAT, factor),
        reviewCount: shouldDropRating
            ? null
            : index % 2 === 0
              ? `${Number(product.reviewCount || 0) + index}`
              : Number(product.reviewCount || 0) + index,
        stock: shouldHideStock ? null : index % 3 === 0 ? "Na sklade viac ako 20ks" : product.stock,
        currency: index % 7 === 0 ? 978 : product.currency,
    };
};

const createCategoryVariant = (category, index) => {
    const variantLabel = createVariantLabel(index);
    const shouldUseLongName = index % 4 === 0;
    const shouldDropLink = index % 5 === 0;
    const shouldDropCount = index % 6 === 0;
    const shouldUseNumericCount = index % 3 === 0;
    const shouldUseNumericCategoryName = index % 7 === 0;
    const shouldDropSubcategories = index % 4 === 1;

    return {
        ...category,
        id: `${category.id || category.name}-${variantLabel}`,
        name: shouldUseNumericCategoryName
            ? 777 + index
            : shouldUseLongName
              ? `${category.name} ${variantLabel} s veľmi dlhým názvom kategórie pre testovanie gridu a zalamovania`
              : `${category.name} ${variantLabel}`,
        productCount: shouldDropCount
            ? null
            : shouldUseNumericCount
              ? `${Number(category.productCount || 0) + index}`
              : Number(category.productCount || 0) + index,
        ctaText: index % 2 === 0 ? 999 : category.ctaText,
        link: shouldDropLink ? null : category.link,
        subcategories: shouldDropSubcategories
            ? []
            : Array.isArray(category.subcategories)
              ? Array.from({ length: 20 }, (_, subIndex) => {
                    const sourceSubcategory =
                        category.subcategories[subIndex % category.subcategories.length];

                    return {
                        ...sourceSubcategory,
                        name:
                            subIndex % 2 === 0
                                ? `${sourceSubcategory.name} ${variantLabel}-${subIndex + 1} s dlhým textom`
                                : subIndex % 5 === 0
                                  ? 12345 + subIndex
                                  : `${sourceSubcategory.name} ${variantLabel}-${subIndex + 1}`,
                        link: subIndex % 4 === 0 ? null : sourceSubcategory.link,
                    };
                })
              : [],
    };
};

const expandCollection = (items, targetLength, createVariant) => {
    if (!Array.isArray(items) || items.length === 0) {
        return [];
    }

    return Array.from({ length: targetLength }, (_, index) => {
        const baseItem = items[index % items.length];
        return createVariant(baseItem, index);
    });
};

export const createResponsiveTestData = (baseData) => {
    if (!baseData) {
        return baseData;
    }

    return {
        ...baseData,
        banner: baseData.banner
            ? {
                  ...baseData.banner,
                  title: `${baseData.banner.title} - testovacie dlhé texty pre responsivitu`,
                  description: LONG_BANNER_TEXT,
                  ctaText: 123,
              }
            : baseData.banner,
        ctaBanner: baseData.ctaBanner
            ? {
                  ...baseData.ctaBanner,
                  title: `${baseData.ctaBanner.title} s dlhším názvom`,
                  description: `${baseData.ctaBanner.description} Tento text je zámerne dlhší, aby sa preverilo zalamovanie a výška CTA boxu na menších obrazovkách.`,
                  ctaText: 456,
              }
            : baseData.ctaBanner,
        products: expandCollection(baseData.products, 50, createProductVariant),
        categories: expandCollection(baseData.categories, 12, createCategoryVariant),
    };
};

export const createNoDataTestData = (baseData) => {
    if (!baseData) {
        return {
            banner: null,
            ctaBanner: null,
            products: [],
            categories: [],
        };
    }

    return {
        ...baseData,
        banner: null,
        ctaBanner: null,
        products: [],
        categories: [],
    };
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createPartialEmptyTestData = (baseData) => {
    if (!baseData) {
        return {
            banner: null,
            ctaBanner: null,
            products: [],
            categories: [],
        };
    }

    const halfProducts = Array.isArray(baseData.products)
        ? baseData.products.slice(0, Math.max(2, Math.floor(baseData.products.length / 2)))
        : [];
    const halfCategories = Array.isArray(baseData.categories)
        ? baseData.categories.slice(0, Math.max(2, Math.floor(baseData.categories.length / 2)))
        : [];

    return {
        ...baseData,
        banner: null,
        ctaBanner: baseData.ctaBanner
            ? {
                  ...baseData.ctaBanner,
                  title: "Fallback CTA test",
                  description: "Čiastočne prázdny scenár: banner chýba, časť dát je prázdna.",
              }
            : null,
        products: expandCollection(halfProducts, 8, createProductVariant),
        categories: halfCategories.map((category, index) => ({
            ...createCategoryVariant(category, index),
            subcategories: index % 2 === 0 ? [] : (category.subcategories || []).slice(0, 4),
        })),
    };
};

export const createManyProductsTestData = (baseData) => {
    if (!baseData) {
        return createNoDataTestData(baseData);
    }

    return {
        ...baseData,
        products: expandCollection(baseData.products, 150, createProductVariant),
        categories: expandCollection(baseData.categories, 8, createCategoryVariant),
    };
};

export const createManyCategoriesTestData = (baseData) => {
    if (!baseData) {
        return createNoDataTestData(baseData);
    }

    return {
        ...baseData,
        products: expandCollection(baseData.products, 24, createProductVariant),
        categories: expandCollection(baseData.categories, 30, createCategoryVariant).map(
            (category, index) => ({
                ...category,
                subcategories: Array.isArray(category.subcategories)
                    ? category.subcategories.slice(0, index % 3 === 0 ? 3 : 10)
                    : [],
            })
        ),
    };
};

export const createRandomScenarioTestData = (baseData) => {
    if (!baseData) {
        return createNoDataTestData(baseData);
    }

    const productTarget = randomInt(0, 120);
    const categoryTarget = randomInt(0, 26);
    const hideBanner = Math.random() < 0.25;
    const hideCtaBanner = Math.random() < 0.35;

    return {
        ...baseData,
        banner: hideBanner
            ? null
            : {
                  ...baseData.banner,
                  title: `${baseData.banner?.title || "Banner"} [random-${randomInt(1, 999)}]`,
              },
        ctaBanner: hideCtaBanner
            ? null
            : {
                  ...baseData.ctaBanner,
                  ctaText: randomInt(100, 999),
              },
        products: expandCollection(baseData.products, productTarget, createProductVariant),
        categories: expandCollection(
            baseData.categories,
            categoryTarget,
            createCategoryVariant
        ).map((category, index) => ({
            ...category,
            subcategories:
                Math.random() < 0.2
                    ? []
                    : Array.isArray(category.subcategories)
                      ? category.subcategories.slice(0, randomInt(2, index % 2 === 0 ? 14 : 8))
                      : [],
        })),
    };
};

export const createResponsiveScenarioData = (baseData, mode = "responsive") => {
    switch (mode) {
        case "responsive-empty":
            return createNoDataTestData(baseData);
        case "responsive-partial-empty":
            return createPartialEmptyTestData(baseData);
        case "responsive-many-products":
            return createManyProductsTestData(baseData);
        case "responsive-many-categories":
            return createManyCategoriesTestData(baseData);
        case "responsive-random":
            return createRandomScenarioTestData(baseData);
        case "responsive":
        default:
            return createResponsiveTestData(baseData);
    }
};
