const editProfileButton = document.querySelector('.profile__edit-button');

editProfileButton.addEventListener('click', function() {
  document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
});