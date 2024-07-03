import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { closePopup, openPopup } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getInitialCards, addNewPlace, getUserInfo, updateUserInfo, updateAvatar } from './scripts/api.js';
import { renderLoading } from './scripts/loader.js'

const cardsContainer = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const formEditProfilePopupElement = editProfilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const addPlaceButton = document.querySelector('.profile__add-button');
const newPlacePopup = document.querySelector('.popup_type_new-card');
const formNewPlacePopupElement = newPlacePopup.querySelector('.popup__form');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placePhotoInput = document.querySelector('.popup__input_type_url');
const cardTemplate = document.querySelector('#card-template').content;

const avatar = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const formEditAvatarElement = popupEditAvatar.querySelector('.popup__form');
const aditAvatarInput = document.querySelector('.popup__input_type_avatar');

let myId = "";

function openPhoto (evt) {
  const currentCard = evt.target.closest('.places__item');
  openPopup(popupImage);

  document.querySelector('.popup__image').src = evt.target.src;
  document.querySelector('.popup__image').alt = evt.target.alt;
  document.querySelector('.popup__caption').textContent = currentCard.querySelector('.card__title').textContent;
}

function showUserInfo(userInfo) {
  document.querySelector('.profile__title').textContent = userInfo.name;
  document.querySelector('.profile__description').textContent = userInfo.about;
  document.querySelector('.profile__image').style = `background-image: url(${userInfo.avatar})`;
}

function handleProfileFormSubmit(evt) {
  const formElement = editProfilePopup.querySelector(".popup__form");

  evt.preventDefault();
  renderLoading(editProfilePopup, true);
  updateUserInfo(document.querySelector('.popup__input_type_name').value, document.querySelector('.popup__input_type_description').value)
  .then(userInfo => {
    if (userInfo) {
        showUserInfo(userInfo);
    } else {
        console.log('Failed to load user info');
    }
  })
  .then(() => closePopup(editProfilePopup))
  .finally(() => renderLoading(editProfilePopup, false));

  

  clearValidation(formElement, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
};

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newPlacePopup, true);
  addNewPlace(placeNameInput.value, placePhotoInput.value)
  .then(card => {
    if (card) {
      cardsContainer.prepend(createCard(card.name, card.link, card.likes, deleteCard, likeCard, openPhoto, card.owner._id, myId, card._id));
      formNewPlacePopupElement.reset();
      closePopup(newPlacePopup);
  } else {
      console.log('Failed to load user info');
  }
  })
  .finally(() => renderLoading(newPlacePopup, false));
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editProfilePopup, true);
  updateAvatar(popupEditAvatar.value)
  .then(userInfo => {
    if (userInfo) {
        showUserInfo(userInfo);
    } else {
        console.log('Failed to load user info');
    }
  })
  .then(() => closePopup(popupEditAvatar))
  .finally(() => renderLoading(popupEditAvatar, false));;  
};

editProfileButton.addEventListener('click', function() {
    openPopup(editProfilePopup);
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
  });

formEditProfilePopupElement.addEventListener('submit', handleProfileFormSubmit);

addPlaceButton.addEventListener('click', function() {
    openPopup(newPlacePopup);
  });

formNewPlacePopupElement.addEventListener('submit', handleNewPlaceFormSubmit);

avatar.addEventListener('click', function() {
  openPopup(popupEditAvatar);
});

formEditAvatarElement.addEventListener('submit', handleAvatarFormSubmit);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

getUserInfo().then(userInfo => {
  if (userInfo) {
      showUserInfo(userInfo);
      myId = userInfo._id;
  } else {
      console.log('Failed to load user info');
  }
});

getInitialCards()
.then(cards => {
  if (cards) {
    cards.forEach(function (card) {
      cardsContainer.append(createCard(card.name, card.link, card.likes, deleteCard, likeCard, openPhoto, card.owner._id, myId, card._id));
    })
  } else {
      console.log('Failed to load cards');
  }
});