import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { closePopup, openPopup, closePopupByOverlay, closePopupOnCloseButton } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getInitialCards, addNewPlace, getUserInfo, updateUserInfo, updateAvatar } from './scripts/api.js';
import { renderLoading } from './scripts/loader.js';

const cardsContainer = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

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
const editAvatarInput = document.querySelector('.popup__input_type_avatar');

let myId = "";

function openPhoto(evt) {
  const currentCard = evt.target.closest('.places__item');
  openPopup(popupImage);

  const popupImageElement = document.querySelector('.popup__image');
  popupImageElement.src = evt.target.src;
  popupImageElement.alt = evt.target.alt;

  const popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = currentCard.querySelector('.card__title').textContent;
}

function showUserInfo(userInfo) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileImage = document.querySelector('.profile__image');

  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style = `background-image: url(${userInfo.avatar})`;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editProfilePopup, true);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  updateUserInfo(nameValue, jobValue)
    .then(userInfo => {
      if (userInfo) {
        showUserInfo(userInfo);
      } else {
        console.log('Failed to load user info');
      }
    })
    .then(() => closePopup(editProfilePopup))
    .finally(() => renderLoading(editProfilePopup, false));
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newPlacePopup, true);

  const placeNameValue = placeNameInput.value;
  const placePhotoValue = placePhotoInput.value;

  addNewPlace(placeNameValue, placePhotoValue)
    .then(card => {
      if (card) {
        const newCard = createCard(card.name, card.link, card.likes, deleteCard, likeCard, openPhoto, card.owner._id, myId, card._id);
        cardsContainer.prepend(newCard);
        formNewPlacePopupElement.reset();
        closePopup(newPlacePopup);
      } else {
        console.log('Failed to load user info');
      }
    })
    .finally(() => renderLoading(newPlacePopup, false));
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupEditAvatar, true);

  const avatarValue = editAvatarInput.value;

  updateAvatar(avatarValue)
      .then(userInfo => {
          if (userInfo) {
              showUserInfo(userInfo);
          } else {
              console.error('Failed to update avatar');
          }
      })
      .then(() => closePopup(popupEditAvatar))
      .finally(() => renderLoading(popupEditAvatar, false));
}

editProfileButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;

  clearValidation(formEditProfilePopupElement, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
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

popups.forEach(function(popup) {
  popup.addEventListener('click', closePopupByOverlay);
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', closePopupOnCloseButton);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

Promise.all([           
  getUserInfo(), 
  getInitialCards() ]) 
  .then(([userInfo, initialCards])=>{ 
    if (userInfo) {
      showUserInfo(userInfo);
      myId = userInfo._id;
    } else {
      console.log('Failed to load user info');
    };

    if (initialCards) {
      initialCards.forEach(function(card) {
        const newCard = createCard(card.name, card.link, card.likes, deleteCard, likeCard, openPhoto, card.owner._id, myId, card._id);
        cardsContainer.append(newCard);
      });
    } else {
      console.log('Failed to load cards');
    }
  })          
  .catch((err)=>{          
  console.log(err);
   }) 


