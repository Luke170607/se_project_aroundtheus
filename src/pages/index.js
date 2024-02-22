import "../blocks/footer.css";
import "../blocks/gallery.css";
import "../blocks/header.css";
import "../blocks/main.css";
import "../blocks/page.css";
import "../blocks/popup.css";
import "../blocks/profile.css";

// import all the classes //

import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import * as constants from "../utils/constants.js";
import { Api } from "../components/Api.js";

// Functions //

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bd0f4ac6-05af-45e7-b717-05910a3f3119",
    "Content-Type": "application/json",
  },
});

const renderCard = (cardData) => {
  console.log(document.querySelector(".gallery__card"));
  const card = new Card(
    cardData,
    constants.selectors.cardTemplate,
    constants.selectors.deleteSelector,
    handleCardClick,
    handleDelete,
    handleToggleLikes,
    document.querySelector(constants.selectors.deleteButtonSelector),
    document.querySelector(constants.selectors.likeSelectorSelector),
    document.querySelector(constants.selectors.imageSelector)
  );
  return card.getView();
};

const popupImageModal = new PopupWithImage("#image-popup");
popupImageModal.setEventListeners();
function handleCardClick(name, link) {
  popupImageModal.openModal(name, link);
}

//Deleting the cards popup API with the event handler //
const confirmPopup = new PopupWithForm(constants.selectors.deleteSelector, {
  handleSubmit: () => {}, // your handler logic here
  buttonText: "Yes",
  loadingButtonText: "Deleting...",
});
confirmPopup.setEventListeners();

function handleDelete(id, card) {
  confirmPopup.openModal();
  confirmPopup.renderLoading(true); // Initiate loading state before API request
  confirmPopup.setSubmitAction(() => {
    api
      .deleteCards(id)
      .then(() => {
        confirmPopup.closeModal();
        card.deleteUI();
      })
      .catch((err) => {
        console.error(err); // Error gets logged to the console
      })
      .finally(() => {
        confirmPopup.renderLoading(false); // Hide loading state
      });
  });
}

// Like button handler //

function handleToggleLikes(id, isLiked, card) {
  if (card && typeof card.handleLike === "function") {
    if (isLiked === false) {
      isLiked = true;
      api
        .addLike(id)
        .then(() => {
          card.handleLike();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      isLiked = false;
      api
        .removeLike(id)
        .then(() => {
          card.handleLike();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } else {
    console.error("Card or handleLike method is undefined.");
  }
}

//Moved the function outside of the class//
function toggleButtonState(form) {
  if (form instanceof HTMLFormElement) {
    const inputs = form.querySelectorAll(".popup__form-input");
    const button = form.querySelector(".popup__form-button");
    // toggles the button state //
  } else {
    console.error("toggleButtonState: Invalid form element");
  }
}

//Form validation for profile name and description //

const editFormValidator = new FormValidator(
  constants.settings,
  constants.profileEditForm
);

editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  constants.settings,
  constants.avatarForm
);

avatarFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  constants.settings,
  constants.addModalForm
);

addFormValidator.enableValidation();

function handleFormFill(userInfoList) {
  constants.profileTitleInput.value = userInfoList.name;
  constants.profileDescriptionInput.value = userInfoList.description;
}

const profilePopup = new PopupWithForm(constants.selectors.profileSelector, {
  handleSubmit: handleProfileEditSubmit,
  buttonText: "Save",
  loadingButtonText: "Saving...",
});
profilePopup.setEventListeners();

const cardPopUp = new PopupWithForm(constants.selectors.addSelector, {
  handleSubmit: handleAddModalSubmit,
  buttonText: "Save",
  loadingButtonText: "Saving...",
});
cardPopUp.setEventListeners();

const avatarPopUp = new PopupWithForm(constants.selectors.avatarSelector, {
  handleSubmit: handleAvatarSubmit,
  buttonText: "Save",
  loadingButtonText: "Saving...",
});
avatarPopUp.setEventListeners();

//Buttons that Open Popup with forms
// grab from userinfo name + descriptions
const newUserInfo = new UserInfo(constants.selectors);
constants.profileEditButton.addEventListener("click", () => {
  handleFormFill(newUserInfo.getUserInfo());
  toggleButtonState(profilePopup.form); // Use profilePopup.form to access the form
  return profilePopup.openModal();
});
constants.addButton.addEventListener("click", () => {
  return cardPopUp.openModal();
});

constants.profileAvatar.addEventListener("click", () => {
  toggleButtonState(avatarPopUp); // Assuming toggleButtonState needs the form as an argument
  return avatarPopUp.openModal();
});

//initializes new section renders inittial cards and new ones
let cardSection;
api
  .getInitialCards()
  .then((data) => {
    cardSection = new Section(
      {
        items: data,
        renderer: renderCard,
      },
      constants.selectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//Submit Button handler
//Toggle Submit button State
/**Event Handlers*/
function handleProfileEditSubmit(modalInputs, popupForm) {
  console.log(modalInputs);
  api
    .updateInfo(modalInputs)
    .then(() => {
      const { title, description } = modalInputs;
      newUserInfo.setUserInfo(title, description);
      toggleButtonState(popupForm); // Use the new function
      profilePopup.closeModal();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupForm.querySelector(".popup__form-button").innerText = "Save";
    });
}
function handleAddModalSubmit(modalInputs, popupForm) {
  api
    .postCards(modalInputs)
    .then((res) => {
      const newCard = renderCard(res);
      cardSection.addItem(newCard);
      addFormValidator.toggleButtonState();
      cardPopUp.closeModal();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupForm.querySelector(".popup__form-button").innerText = "Save";
    });
}
function handleAvatarSubmit(modalInputs, popupForm) {
  api
    .updateAvatar(modalInputs)
    .then(() => {
      newUserInfo.setAvatar(modalInputs.Url);
      popupForm.reset();
      avatarFormValidator.toggleButtonState();
      avatarPopUp.closeModal();
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    })
    .finally(() => {
      popupForm.querySelector(".popup__form-button").innerText = "Save";
    });
}
api
  .loadInfo()
  .then((data) => {
    const { name, about, avatar } = data;
    newUserInfo.setUserInfo(name, about);
    newUserInfo.setAvatar(avatar);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });
