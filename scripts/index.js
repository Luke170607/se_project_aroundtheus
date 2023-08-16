const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#card-edit-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector("#add-card-form");

const previewImageModal = document.querySelector("#modal-preview-image");
const previewImage = previewImageModal.querySelector(".modal__image-preview");
const previewTitle = previewImageModal.querySelector(".modal__image-title");
const modals = document.querySelectorAll(".modal");

// buttons and dom nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewModalCloseButton =
  previewImageModal.querySelector(".modal__close");

const cardAddSubmitButton = addCardModal.querySelector(".modal__button");

// form data
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// Defining the modal varilable //
let modal = null;

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keyup", closeByEscape);
  }
}

function openModal(modalElement) {
  modalElement.classList.add("modal_opened");
  document.addEventListener("keyup", closeByEscape);
  modal = modalElement;
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");

    closeModal(openedModal);
  }
}

function closeByClick(event, modal) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains("modal__close")
  ) {
    closeModal(modal);
  }
}

document.addEventListener("click", (event) => {
  const openedModal = document.querySelector(".modal_opened");
  if (openedModal && !event.target.closest(".modal")) {
    closeByClick(event, openedModal);
  }
});

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}
function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);

  addCardFormElement.reset();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewImageModal);
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

// form listeners
previewModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (event.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".modal")) {
    closeByClick(event, modal);
  }
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
