import { html } from "lit-html";
import { asNumber } from "../../../utils/display.js";

export const rating = (rating, reviewCount) => html`
    <div class="c-product-rating">
        <div class="c-product-rating__stars">
            ${(() => {
                const safeRating = asNumber(rating, 0);
                return [1, 2, 3, 4, 5].map(
                    (star) => html`
                        <svg
                            class="c-product-rating__star"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            fill="${star <= Math.round(safeRating) ? "#FFD700" : "#E0E0E0"}"
                        >
                            <path
                                d="M 50 10 L 61 35 L 90 35 L 68 57 L 79 90 L 50 75 L 21 90 L 32 57 L 10 35 L 39 35 Z"
                            />
                        </svg>
                    `
                );
            })()}
        </div>
        <div class="c-product-rating__count">(${asNumber(reviewCount, 0)})</div>
    </div>
`;
