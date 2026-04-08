import { html } from "lit-html";

/**
 * Render footer component
 * @returns {TemplateResult} Footer template
 */
export const renderFooter = () => {
    const currentYear = new Date().getFullYear();

    return html`
        <footer class="l-page__footer">
            <div class="l-container">
                <div class="l-footer">
                    <div class="l-footer__copyright">
                        &copy; ${currentYear} Riesenia. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    `;
};
