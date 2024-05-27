export function createCard(name, link, deleteCard, likeCard, openPhoto) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = `Фотография с видами региона ${name}`;
  cardElement.querySelector('.card__image').addEventListener('click', openPhoto);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

  return cardElement;
}

export function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

export function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

