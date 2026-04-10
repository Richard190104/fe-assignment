import { html } from "lit-html";

export const notification = (title, message, type) => {
    return html`
        <div class="c-notification ${type === "error" ? "is-error" : "is-success"}">
            <p class="c-notification__title">${title}</p>
            <p class="c-notification__message">${message}</p>
        </div>
    `;
};