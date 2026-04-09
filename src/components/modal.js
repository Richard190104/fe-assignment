import { html } from "lit-html";
export const form = ({ title, description, isOpen, onClose, onBackdropClick }) => html`
    <div class="c-modal ${isOpen ? "is-open" : ""}" @click=${onBackdropClick} ?hidden=${!isOpen}>
        <div class="c-modal__dialog" role="dialog" aria-modal="true" aria-label=${title}>
            <button class="c-modal__close" @click=${onClose} aria-label="Zatvoriť formulár">×</button>
            <div class="c-modal-form">
                <div class="c-modal-form__head">
                    <h2 class="c-modal-form__title">${title}</h2>
                    <p class="c-modal-form__required"><span aria-hidden="true">*</span> povinné polia</p>
                </div>
                <form class="c-modal-form__form">
                    <label class="c-modal-form__field">
                        <span class="c-modal-form__field-label">E-mail <span aria-hidden="true">*</span></span>
                        <input class="c-modal-form__field-input" type="email" placeholder="" required />
                    </label>

                    <div class="c-modal-form__row">
                        <label class="c-modal-form__field">
                            <span class="c-modal-form__field-label">Meno a priezvisko <span aria-hidden="true">*</span></span>
                            <input class="c-modal-form__field-input" type="text" placeholder="" required />
                        </label>

                        <label class="c-modal-form__field">
                            <span class="c-modal-form__field-label">Telefónne číslo (mobil) <span aria-hidden="true">*</span></span>
                            <input class="c-modal-form__field-input" type="tel" placeholder="+421 _ _ _  _ _ _  _ _ _" required />
                        </label>
                    </div>

                    <label class="c-modal-form__field">
                        <span class="c-modal-form__field-label">Odkiaľ ste sa o tejto ponuke dozvedeli? <span aria-hidden="true">*</span></span>
                        <div class="c-modal-form__select-wrap">
                            <select class="c-modal-form__field-input c-modal-form__field-input--select" name="service" required>
                                <option value="web" selected>Priamo z vášho webu</option>
                                <option value="social">Zo sociálnych sietí</option>
                                <option value="search">Z internetového vyhľadávača</option>
                                <option value="friend">Od známeho</option>
                            </select>
                        </div>
                    </label>

                    <div class="c-modal-form__actions">
                        <button type="submit" class="c-modal-form__submit">
                            Získať tajnú ponuku
                            <span aria-hidden="true">→</span>
                        </button>
                        <p class="c-modal-form__consent">
                            Odoslaním formuláru súhlasíte so
                            <a href="#" class="c-modal-form__consent-link">spracovaním osobných údajov</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;