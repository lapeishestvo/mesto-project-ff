import { createCard } from './card';

export function closePopup(evt) {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(function(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
  });
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = document.querySelector('.popup__input_type_name').value;
  document.querySelector('.profile__description').textContent = document.querySelector('.popup__input_type_description').value;
  closePopup();
};

export function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.places__list').prepend(createCard(document.querySelector('.popup__input_type_card-name').value, document.querySelector('.popup__input_type_url').value));
  document.querySelector('.popup__input_type_card-name').value = '';
  document.querySelector('.popup__input_type_url').value = '';
  closePopup();
};