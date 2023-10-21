import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".popup__image-preview"
    );
    console.log(this._imageElement);
    console.log(this._popupElement);
    this._imageCaption = this._popupElement.querySelector(
      ".popup__image-caption"
    );
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    this._imageCaption.textContent = data.name;
    super.open();
  }
}
