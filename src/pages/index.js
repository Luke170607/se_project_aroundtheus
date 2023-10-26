import "./index.css";

// import all the classes //

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Popup from "../components/Popup";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

import {
  initialCards,
  profileEditBtn,
  profileEditModal,
  profileModalCloseBtn,
  profileModalName,
  profileModalTitle,

  profileTitle,
  addPicBtn,
  addPicModal,
  addPicModalCloseBtn,
  imageModal,
  imageModalCloseBtn,
  cardList,
  validationSettings,
  profileModalForm,
} from "../utils/constants.js";

// Form validation //

const addPicPopup = new PopupWithForm("#add-popup", handleAddFormSubmit);
addPicPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  handleEditProfileFormSubmit
);
editProfilePopup.setEventListeners();

const editFormValidator = new FormValidator(
  validationSettings,
  profileModalForm
);
editFormValidator.enableValidation();

const addPicModalForm = addPicModal.querySelector(".popup__form");
const addFormValidator = new FormValidator(validationSettings, addPicModalForm);
addFormValidator.enableValidation();
// // User info //

const userInfo = new UserInfo(".profile__name", ".profile__title");

// // functions //

function handleImageClick(card) {
  const data = {
    link: card.src,
    name: card.alt,
  };
  imagePreview.open(data);
}

function handleAddFormSubmit(data) {
  renderCard(data);
  addPicPopup.close();
}

function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}

// //
// // EVENT LISTENERS
// //

profileEditBtn.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileModalName.value = data.name;
  profileModalTitle.value = data.about;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addPicBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addPicPopup.open();
});

// //
// // PopupWithImage
// //

const imagePreview = new PopupWithImage("#popup-image");
imagePreview.setEventListeners();

// //
// // Section
// //

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const element = card.getView();
  cardSection.addItem(element);
}

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

cardSection.renderItems();
