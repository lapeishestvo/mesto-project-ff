import { closePopup } from './modal.js';



function handleFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = placeNameInput.value;
  cardElement.querySelector('.card__image').src = placePhotoInput.value;
  cardElement.querySelector('.card__image').alt = `Фотография с видами региона ${placeNameInput.value}`;
  cardElement.querySelector('.card__image').addEventListener('click', openPhoto(card.link, card.name));
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

  cardsContainer.prepend(cardElement);

  newPlacePopup.classList.remove('popup_is-opened');
  newPlacePopup.classList.add('popup_is-animated');
};

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

function openPhoto (link, name) {
  document.querySelector('.popup_type_image').classList.add('popup_is-opened');
  document.querySelector('.popup__image').src = link;
  document.querySelector('.popup__image').alt = `Фотография с видами региона ${name}`;
  document.querySelector('.popup__caption').textContent = name;
}

