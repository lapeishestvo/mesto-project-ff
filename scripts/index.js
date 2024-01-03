// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `Фотография с видами региона ${card.name}`;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  cardsContainer.append(cardElement);
}

function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

initialCards.forEach(function (card) {
  createCard(card, deleteCard);
})
