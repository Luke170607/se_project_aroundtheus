export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._imageDeleteButton("click", () => this._handleDeleteButton());
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this._cardImageElement)
    );
  }

  __handleLikeButton() {
    this._likeButton.toggle(".card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setCardElements() {
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.alt = this._name;
    (this._cardImageElement.src = this), _link;
    this._cardTitleElement.textContent = this._name;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardTitleElement = this._cardElement(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._imageDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setCardElements();
    this._setEventListeners();
    return this._cardElement;
  }
}
