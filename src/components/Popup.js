export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  openModal() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeModalByEscape);
  }
  closeModal() {
    this._popupElement.classList.remove("popup_opened");
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
    this._popupElement.addEventListener("click", this._closeModalOnRemoteClick);
  }
}
