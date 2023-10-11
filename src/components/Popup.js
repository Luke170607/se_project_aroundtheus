export default class Popup {
  constructor({popupSelector}) 
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._closeOnRemoteClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._closeOnRemoteClick
    );
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  _closeOnRemoteClick = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    // this._openButton.addEventListener("click", this.open());
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    // I didnt have this as an arrow function and it wasn't working.......... ^^^
  }
