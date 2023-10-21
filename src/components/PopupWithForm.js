import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    console.log(this._popupForm);
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".popup__input");
    // console.log(inputs);
    const inputValues = {};
    inputs.forEach((input) => (inputValues[input.name] = input.value));
    console.log(inputValues);
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
