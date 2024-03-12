const closeButton = document.querySelector('.popup__close');
const overlay = document.querySelector('.popup__close');

closeButton.addEventListener('click', function() {
  document.querySelector('.popup').classList.remove('popup_is-opened');
});