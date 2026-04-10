import { html } from "lit-html";
import { validateEmail } from "../../../api/emailApi.js";

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_REGEX = /^[+\d\s]+$/;

const setFieldError = (input, message) => {
    if (!input) {
        return;
    }

    input.classList.add("is-invalid");
    const field = input.closest(".c-modal-form__field");
    const errorNode = field?.querySelector(".c-modal-form__error");
    if (errorNode) {
        errorNode.textContent = message;
    }
};

const clearFieldError = (input) => {
    if (!input) {
        return;
    }

    input.classList.remove("is-invalid");
    const field = input.closest(".c-modal-form__field");
    const errorNode = field?.querySelector(".c-modal-form__error");
    if (errorNode) {
        errorNode.textContent = "";
    }
};

const showFormMessage = (formElement, message, type = "") => {
    const statusNode = formElement.querySelector(".c-modal-form__status");
    if (!statusNode) {
        return;
    }

    statusNode.textContent = message;
    statusNode.classList.remove("is-error", "is-success");

    if (type) {
        statusNode.classList.add(type);
    }
};

const clearFormState = (formElement) => {
    const inputs = formElement.querySelectorAll(".c-modal-form__field-input");
    inputs.forEach((input) => {
        clearFieldError(input);
    });
    showFormMessage(formElement, "");
};

const isPhoneValid = (phoneValue) => {
    const normalized = phoneValue.replace(/\s+/g, "");
    if (!PHONE_ALLOWED_REGEX.test(phoneValue)) {
        return false;
    }

    const digitsOnly = normalized.replace(/\D/g, "");
    return digitsOnly.length >= 9 && digitsOnly.length <= 13;
};

function handleFieldInput(event) {
    const input = event.target;
    clearFieldError(input);

    const formElement = input.closest(".c-modal-form__form");
    if (formElement) {
        showFormMessage(formElement, "");
    }
}

function handleDialogKeydown(event, onClose) {
    if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
    }
}

async function handleSubmit(e, { onSuccess, onClose } = {}) {
    e.preventDefault();

    const formElement = e.currentTarget;
    const emailInput = formElement.elements.email;
    const fullNameInput = formElement.elements.fullName;
    const phoneInput = formElement.elements.phone;
    const sourceInput = formElement.elements.service;
    const submitButton = formElement.querySelector(".c-modal-form__submit");

    clearFormState(formElement);

    let hasError = false;
    const emailValue = emailInput?.value.trim() || "";
    const fullNameValue = fullNameInput?.value.trim() || "";
    const phoneValue = phoneInput?.value.trim() || "";
    const sourceValue = sourceInput?.value || "";

    if (!emailValue) {
        hasError = true;
        setFieldError(emailInput, "E-mail je povinný.");
    } else if (!EMAIL_FORMAT_REGEX.test(emailValue)) {
        hasError = true;
        setFieldError(emailInput, "Zadajte e-mail v správnom formáte.");
    }

    if (!fullNameValue) {
        hasError = true;
        setFieldError(fullNameInput, "Meno a priezvisko je povinné.");
    }

    if (!phoneValue) {
        hasError = true;
        setFieldError(phoneInput, "Telefónne číslo je povinné.");
    } else if (!isPhoneValid(phoneValue)) {
        hasError = true;
        setFieldError(phoneInput, "Zadajte telefón v správnom formáte.");
    }

    if (!sourceValue) {
        hasError = true;
        setFieldError(sourceInput, "Vyberte jednu možnosť.");
    }

    if (hasError) {
        showFormMessage(formElement, "Prosím opravte označené polia.", "is-error");
        return;
    }

    submitButton?.setAttribute("disabled", "true");
    showFormMessage(formElement, "Overujem e-mail...");

    const emailValidationResponse = await validateEmail(emailValue);

    submitButton?.removeAttribute("disabled");

    if (!emailValidationResponse?.success) {
        setFieldError(
            emailInput,
            emailValidationResponse?.message || "E-mail sa nepodarilo overiť."
        );
        showFormMessage(formElement, "Zadali ste nesprávny E-mail.", "is-error");
        return;
    }

    formElement.reset();
    showFormMessage(formElement, "Formulár bol úspešne odoslaný!", "is-success");

    onSuccess?.({
        title: "Formulár odoslaný",
        message: "Ďakujeme, ozveme sa vám čo najskôr.",
        type: "success",
    });

    onClose?.();
}

export const form = ({ title, isOpen, onClose, onBackdropClick, onSuccess }) => html`
    <div class="c-modal ${isOpen ? "is-open" : ""}" @click=${onBackdropClick} ?hidden=${!isOpen}>
        <div
            class="c-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-label=${title}
            @keydown=${(event) => handleDialogKeydown(event, onClose)}
        >
            <button class="c-modal__close" @click=${onClose} aria-label="Zatvoriť formulár">
                ×
            </button>
            <div class="c-modal-form">
                <div class="c-modal-form__head">
                    <h2 class="c-modal-form__title">${title}</h2>
                    <p class="c-modal-form__required">
                        <span aria-hidden="true">*</span> povinné polia
                    </p>
                </div>
                <form
                    class="c-modal-form__form"
                    @submit=${(e) => handleSubmit(e, { onSuccess, onClose })}
                    novalidate
                >
                    <p class="c-modal-form__status" aria-live="polite"></p>
                    <label class="c-modal-form__field">
                        <span class="c-modal-form__field-label"
                            >E-mail <span aria-hidden="true">*</span></span
                        >
                        <input
                            class="c-modal-form__field-input"
                            name="email"
                            type="email"
                            placeholder=""
                            @input=${handleFieldInput}
                            required
                        />
                        <small class="c-modal-form__error"></small>
                    </label>

                    <div class="c-modal-form__row">
                        <label class="c-modal-form__field">
                            <span class="c-modal-form__field-label"
                                >Meno a priezvisko <span aria-hidden="true">*</span></span
                            >
                            <input
                                class="c-modal-form__field-input"
                                name="fullName"
                                type="text"
                                placeholder=""
                                @input=${handleFieldInput}
                                required
                            />
                            <small class="c-modal-form__error"></small>
                        </label>

                        <label class="c-modal-form__field">
                            <span class="c-modal-form__field-label"
                                >Telefónne číslo (mobil) <span aria-hidden="true">*</span></span
                            >
                            <input
                                class="c-modal-form__field-input"
                                name="phone"
                                type="tel"
                                placeholder="+421 _ _ _  _ _ _  _ _ _"
                                @input=${handleFieldInput}
                                required
                            />
                            <small class="c-modal-form__error"></small>
                        </label>
                    </div>

                    <label class="c-modal-form__field">
                        <span class="c-modal-form__field-label"
                            >Odkiaľ ste sa o tejto ponuke dozvedeli?
                            <span aria-hidden="true">*</span></span
                        >
                        <div class="c-modal-form__select-wrap">
                            <select
                                class="c-modal-form__field-input c-modal-form__field-input--select"
                                name="service"
                                @change=${handleFieldInput}
                                required
                            >
                                <option value="" selected disabled>Vyberte možnosť</option>
                                <option value="web">Priamo z vášho webu</option>
                                <option value="social">Zo sociálnych sietí</option>
                                <option value="search">Z internetového vyhľadávača</option>
                                <option value="friend">Od známeho</option>
                            </select>
                        </div>
                        <small class="c-modal-form__error"></small>
                    </label>

                    <div class="c-modal-form__actions">
                        <button type="submit" class="c-modal-form__submit">
                            Získať tajnú ponuku
                            <span aria-hidden="true">→</span>
                        </button>
                        <p class="c-modal-form__consent">
                            Odoslaním formuláru súhlasíte so
                            <a href="#" class="c-modal-form__consent-link"
                                >spracovaním osobných údajov</a
                            >
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
