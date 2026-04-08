import { html } from "lit-html";
export const form = ({ title, description, isOpen, onClose, onBackdropClick }) => html`
    <div class="c-modal ${isOpen ? "is-open" : ""}" @click=${onBackdropClick} ?hidden=${!isOpen}>
        <div class="c-modal__dialog" role="dialog" aria-modal="true" aria-label=${title}>
            <button class="c-modal__close" @click=${onClose} aria-label="Zatvoriť formulár">×</button>
            <div class="c-modal-form">
                <h2 class="c-modal-form__title">${title}</h2>
                <form class="c-modal-form__form">
                    <input type="text" placeholder="Meno" required />
                    <input type="email" placeholder="Email" required />
                    <textarea placeholder="Správa" required></textarea>
                    <button type="submit" class="c-modal-form__submit">Odoslať</button>
                </form>
            </div>
        </div>
    </div>
`;