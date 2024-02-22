export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;

    this._inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    const errorMessageRedLine = this._formElement.querySelector(
      `#${inputElement.id}-redline`
    );
    errorMessageRedLine.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    const errorMessageRedLine = this._formElement.querySelector(
      `#${inputElement.id}-redline`
    );

    errorMessageRedLine.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputElements) {
    console.log(inputElements);
    console.log(Array.isArray(inputElements));
    return Array.from(inputElements).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputElements, submitButton) {
    console.log(inputElements);
    if (this._hasInvalidInput(inputElements)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setSubmitListener() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  _setEventListeners() {
    this._setSubmitListener();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);

      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputElements, this._submitButton);
      });
    });
  }

  resetValidation() {
    this._toggleButtonState(this._inputElements, this._submitButton);

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
