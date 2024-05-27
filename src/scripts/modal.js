import { createCard } from './card';

export function openPopup(popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');

  popup.addEventListener('click', closePopupByOverlay)

  /* popup.addEventListener('click', closePopupOnClick);
  popup.querySelector('.popup__content').addEventListener('click', stopPropagation); */

  popup.querySelector('.popup__close').addEventListener('click', closePopupOnCloseButton);

  document.addEventListener('keydown', closePopupOnEscape);

  function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
       closePopup(evt.target)
    }
}

  function closePopupOnCloseButton() {
    closePopup(popup);
  }

  function stopPropagation(evt) {
    evt.stopPropagation();
  }

  function closePopupOnEscape(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  }

  popup._closePopupByOverlay = closePopupByOverlay;
  popup._closePopupOnCloseButton = closePopupOnCloseButton;
  popup._stopPropagation = stopPropagation;
  popup._closePopupOnEscape = closePopupOnEscape;
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');

  popup.removeEventListener('click', popup._closePopupOnClick);
  popup.querySelector('.popup__content').removeEventListener('click', popup._stopPropagation);
  document.removeEventListener('keydown', popup._closePopupOnEscape);

  delete popup._closePopupOnClick;
  delete popup._stopPropagation;
  delete popup._closePopupOnEscape;
  delete popup._closePopupByOverlay;
}