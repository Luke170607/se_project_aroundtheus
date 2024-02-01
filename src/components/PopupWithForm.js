import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit, buttonText, loadingButtonText }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleSubmit = handleSubmit;
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
    this._submitButton = this._popupForm.querySelector(".popup__form-button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      const modalInputs = this._getInputValues();
      e.preventDefault();
      this.renderLoading(true);
      this._handleSubmit(modalInputs, this._popupForm);
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._loadingButtonText;
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  setSubmitAction(callBackfn) {
    this._handleSubmit = callBackfn;
  }

  _getInputValues() {
    const modalInputs = {};

    const modalInputsList =
      this._popupForm.querySelectorAll(".popup__form-input");
    console.log(modalInputsList);
    modalInputsList.forEach((input) => {
      modalInputs[input.name] = input.value;
    });
    return modalInputs;
  }
}
