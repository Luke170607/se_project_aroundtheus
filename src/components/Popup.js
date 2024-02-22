export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeElement = document.querySelector(
      `#${this._popupElement.id} .popup__container-close`
    );
    console.log(this._closeElement.id);
  }
  openModal() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeModalByEscape);
  }
  closeModal() {
    console.log(this._popupElement.id);
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeModalByEscape);
  }
  _closeModalByEscape = (evt) => {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  };
  _closeModalOnRemoteClick = (evt) => {
    this.closeModal();
  };

  setEventListeners() {
    this._closeElement.addEventListener("click", this._closeModalOnRemoteClick);
  }
}
