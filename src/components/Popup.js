export class Popup {
  constructor(popUpSelector) {
    this._popUpElement = document.querySelector(popUpSelector);
  }
  openModal() {
    this._popUpElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeModalByEscape);
  }
  closeModal() {
    this._popUpElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeModalByEscape);
  }
  _closeModalByEscape = (e) => {
    if (e.key === "Escape") {
      this.closeModal();
    }
  };
  _closeModalOnRemoteClick = (evt) => {
    //"." isn't required for classlist
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("popup__container") ||
      evt.target.classList.contains("popup__container-close")
    ) {
      this.closeModal();
    }
  };
  setEventListeners() {
    this._popUpElement.addEventListener("click", this._closeModalOnRemoteClick);
  }
}
