

// @todo: Функция создания карточки
function createCard(element, openImageHandler, likeCardHandler, cardItem) {
  const cardTitle = element.name;
  const cardLink = element.link;
  
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardImage = cardItem.querySelector('.card__image');
  const likeButton = cardItem.querySelector('.card__like-button');
  
  cardItem.querySelector('.card__title').textContent = cardTitle;
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', `Фотография места - ${cardTitle}`);

  deleteButton.addEventListener('click', () => deleteCard(cardItem));
  cardImage.addEventListener('click', openImageHandler);
  likeButton.addEventListener('mouseup', likeCardHandler);

  return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

//Функция добавления лайка карточке
const addLikeToCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, addLikeToCard };