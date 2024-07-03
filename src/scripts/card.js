import { deleteCardFromServer, giveLike, deleteLike } from '../scripts/api.js'

export function createCard(name, link, likes, deleteCard, likeCard, openPhoto, userId, myId, cardId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const myCard = userId === myId;
  const meLiked = likes.some(like => like._id === myId);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = `Фотография с видами региона ${name}`;
  cardElement.querySelector('.card__image').addEventListener('click', openPhoto);
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => likeCard(cardId, evt));
  cardElement.querySelector('.card__likes_counter').textContent = likes.length;

  if (myCard) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(cardId, evt));
  }
  else {
    cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_hidden');
  }

  if (meLiked) {
    cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  } else {
    cardElement.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
  }

  return cardElement;
}

export function deleteCard(cardId, evt) {
  console.log(evt);
    evt.target.closest('.places__item').remove();
    console.log(evt.target);
    deleteCardFromServer(cardId);
}

export function likeCard(cardId, evt) {
  const likeButton = evt.target;
  const likesCounter = likeButton.closest('.places__item').querySelector('.card__likes_counter');
  const currentlyLiked = likeButton.classList.contains('card__like-button_is-active');

  const action = currentlyLiked ? deleteLike(cardId) : giveLike(cardId);

  action.then(updatedCard => {
    if (currentlyLiked) {
      likeButton.classList.remove('card__like-button_is-active');
    } else {
      likeButton.classList.add('card__like-button_is-active');
    }

    likesCounter.textContent = updatedCard.likes.length;
  }).catch(error => {
    console.error('Error updating likes:', error);
  });
}

