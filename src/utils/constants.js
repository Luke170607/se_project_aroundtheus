export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const profileEditModal = document.querySelector("#profile-edit-popup");
export const addModal = document.querySelector("#card-popup");
export const addModalForm = addModal.querySelector("#card-popup-form");
export const profileEditForm = profileEditModal.querySelector(".popup__form");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditButton = document.querySelector(".profile__edit");
export const addButton = document.querySelector(".profile__add-button");
export const avatarModal = document.querySelector("#avatar-popup");
export const avatarForm = avatarModal.querySelector("#avatar-popup-form");
export const profileAvatar = document.querySelector(".profile__avatar-image");
export const confirmPopup = document.querySelector("#delete-popup");
export const deleteFormSubmit = confirmPopup.querySelector(
  ".popup__form-button"
);

export const settings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const selectors = {
  cardSection: ".gallery__cards",
  cardTemplate: "#card-template",
  popupSelector: ".modal",
  profileSelector: "#profile-edit-popup",
  addSelector: "#card-popup",
  imageSelector: ".gallery__card-image",
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: "#avatar-popup",
  avatarImage: ".profile__avatar-image",
  deleteSelector: "#delete-popup",
  deleteButtonSelector: ".gallery__card-delete",
  likeSelector: ".gallery__card-button",
};
