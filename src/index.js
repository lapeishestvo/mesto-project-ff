import './pages/index.css';
import { createCard, openPhoto } from './scripts/card.js';
import { closePopup, handleProfileFormSubmit, handleNewPlaceFormSubmit } from './scripts/modal.js';
import { initialCards } from './scripts/cards.js';

const cardsContainer = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_image');
const closePopupImageButton = popupImage.querySelector('.popup__close');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const formEditProfilePopupElement = editProfilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const overlay = document.querySelector('.popup');
const contentPopup = document.querySelector('.popup__content');
const closeProfilePopupButton = editProfilePopup.querySelector('.popup__close');

const addPlaceButton = document.querySelector('.profile__add-button');
const newPlacePopup = document.querySelector('.popup_type_new-card');
const formNewPlacePopupElement = newPlacePopup.querySelector('.popup__form');
const closeNewPlacePopupButton = newPlacePopup.querySelector('.popup__close');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placePhotoInput = document.querySelector('.popup__input_type_url');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(function (card) {
    cardsContainer.append(createCard(card.name, card.link));
  })

formEditProfilePopupElement.addEventListener('submit', handleProfileFormSubmit);

editProfileButton.addEventListener('click', function() {
    document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
    nameInput.value = 'Жак-Ив Кусто';
    jobInput.value = 'Исследователь океана';
  });

addPlaceButton.addEventListener('click', function() {
    document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
  });
  
closePopupImageButton.addEventListener('click', closePopup);
closeProfilePopupButton.addEventListener('click', closePopup);
closeNewPlacePopupButton.addEventListener('click', closePopup);
  
overlay.addEventListener('click', closePopup);
  
contentPopup.addEventListener('click', target => target.stopPropagation());
  
document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        closePopup();
      };
  });

formNewPlacePopupElement.addEventListener('submit', handleNewPlaceFormSubmit);