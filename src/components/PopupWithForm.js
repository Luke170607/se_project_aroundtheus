import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      const modalInputs = this._getInputValues();
      e.preventDefault();
      this._popupForm.querySelector(".popup__form-button").innerText =
        "Saving...";
      this._handleFormSubmit(modalInputs, this._popupForm);
    });
  }
  setSubmitAction(callBackfn) {
    this._handleFormSubmit = callBackfn;
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
