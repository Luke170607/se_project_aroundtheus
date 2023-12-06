import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      const modalInputs = this._getInputValues();
      e.preventDefault();
      this._popUpForm.querySelector(".popup__button").innerText = "Saving...";
      this._handleModalSubmit(modalInputs, this._popUpForm);
    });
  }
  setSubmitAction(callBackfn) {
    this._handleModalSubmit = callBackfn;
  }
  _getInputValues() {
    const modalInputs = {};
    const modalInputsList = this._popUpForm.querySelectorAll(".popup__input");
    modalInputsList.forEach((input) => {
      modalInputs[input.name] = input.value;
    });
    return modalInputs;
  }
}
