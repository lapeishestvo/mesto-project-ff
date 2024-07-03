import { clearValidation } from './validation.js';

export function openPopup(popup) {
  const formElement = popup.querySelector(".popup__form")
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');

  popup.addEventListener('click', closePopupByOverlay)
  popup.querySelector('.popup__close').addEventListener('click', closePopupOnCloseButton);

  document.addEventListener('keydown', closePopupOnEscape);

  function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
       closePopup(evt.target)
    }
  }

  clearValidation(formElement, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
  
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