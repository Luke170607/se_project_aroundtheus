import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
  }
  openModal(name, link) {
    this.popUpImage = this._popUpElement.querySelector(".popup__image-preview");
    this.popUpTitle = this._popUpElement.querySelector(".popup__image-caption");
    this.popUpImage.src = link;
    this.popUpImage.alt = name;
    this.popUpTitle.textContent = name;
    super.openModal();
  }
}
