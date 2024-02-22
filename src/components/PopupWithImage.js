import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  openModal(name, link) {
    this.popupImage = this._popupElement.querySelector(".popup__image-preview");
    this.popupTitle = this._popupElement.querySelector(".popup__image-caption");
    this.popupImage.src = link;
    this.popupImage.alt = name;
    this.popupTitle.textContent = name;
    super.openModal();
  }
}
