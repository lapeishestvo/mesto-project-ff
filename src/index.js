import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { closePopup, openPopup } from './scripts/modal.js';
import { initialCards } from './scripts/cards.js';

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

function openPhoto (evt) {
  const currentCard = evt.target.closest('.places__item');
  openPopup(popupImage);

  document.querySelector('.popup__image').src = evt.target.src;
  document.querySelector('.popup__image').alt = evt.target.alt;
  document.querySelector('.popup__caption').textContent = currentCard.querySelector('.card__title').textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = document.querySelector('.popup__input_type_name').value;
  document.querySelector('.profile__description').textContent = document.querySelector('.popup__input_type_description').value;
  closePopup(editProfilePopup);
};

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(placeNameInput.value, placePhotoInput.value, deleteCard, likeCard, openPhoto));
  formNewPlacePopupElement.reset();
  closePopup(newPlacePopup);
};

initialCards.forEach(function (card) {
    cardsContainer.append(createCard(card.name, card.link, deleteCard, likeCard, openPhoto));
  })

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

