function closePopupOnEscape(popup, evt) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => closePopupOnEscape(popup, evt));
};

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => closePopupOnEscape(popup, evt));
};

export function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
     closePopup(evt.target)
  }
};

export function closePopupOnCloseButton(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}