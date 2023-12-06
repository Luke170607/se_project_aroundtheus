export default class Card {
  constructor(
    { name, link, isLiked, _id },
    cardSelector,
    popupSelector,
    handleCardClick,
    handleDelete,
    handleToggleLikes
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._popupSelector = popupSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleToggleLikes = handleToggleLikes;
  }

  //like button
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleToggleLikes(this._id, this._isLiked, this);
    });

    // delete button
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this._id, this);
    });

    //image popup
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //EVT handlers //
  handleLike() {
    this._likeButton.classList.toggle("gallery__card-button_active");
  }
  _updateLikeStatus() {
    if (this._isLiked) {
      this._likeButton.classList.add("gallery__card-button_active");
    } else {
      this._likeButton.classList.remove("gallery__card-button_active");
    }
  }
  deleteUI() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);
    return this._cardElement;
  }
  getView() {
    // get card view
    this._card = this.getTemplate();
    this._likeButton = this._card.querySelector(".gallery__card-button");
    this._cardImage = this._card.querySelector(".gallery__card-image");
    this._trashButton = this._card.querySelector(".gallery__card-delete");
    this._cardImage.src = this._link;
    this._card.querySelector(".gallery__card-title").textContent = this._name;
    this._cardImage.alt = "Photo of " + `${this._name}`;
    // set listeners
    this._updateLikeStatus();
    this._setEventListeners();
    // return card
    return this._card;
  }
}
