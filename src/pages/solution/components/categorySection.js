import { html } from "lit-html";
import { getShortenText, MAX_SUBCATEGORIES_PER_CATEGORY } from "./shared.js";

export const solutionCategoryCard = (category, { asNumber, asText }) => html`
    <article class="c-solution-category-card">
        <div class="c-solution-category-card__image" style="background-image: url(${category.imageUrl})"></div>
        <div class="c-solution-category-card__overlay"></div>
        <div class="c-solution-category-card__content">
            <div class="c-solution-category-card__header">
                <h3 class="c-solution-category-card__title">${asText(getShortenText(category.name, 50), "Kategória bez názvu")}</h3>
                <span class="c-solution-category-card__count">${asNumber(category.productCount, 0)}</span>
            </div>

            <ul class="c-solution-category-card__list">
                ${(category.subcategories || []).slice(0, MAX_SUBCATEGORIES_PER_CATEGORY).map(
                    (subcategory) => html`
                        <li class="c-solution-category-card__item">
                            <a href="${subcategory.link || "#"}" class="c-solution-category-card__sublink"
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

export const solutionCategories = (categories = [], { asNumber, asText, emptyState }) => html`
    <section class="c-solution-categories">
        <h2 class="c-solution-categories__title">Top kategórie produktov</h2>
        ${categories.length > 0
            ? html`<div class="c-solution-categories__grid">
                  ${categories.map((category) => solutionCategoryCard(category, { asNumber, asText }))}
              </div>`
            : emptyState("Could not load categories.", "", "c-empty-state--categories")}
    </section>
`;
