const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;

// @todo: Функция создания карточки
function createCard(element, openImageHandler, likeCardHandler) {
  const cardTitle = element.name;
  const cardLink = element.link;
  const cardElement = cardTemplateContent.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', `Фотография - ${cardTitle}`);

  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  cardImage.addEventListener('click', openImageHandler);
  likeButton.addEventListener('mouseup', likeCardHandler);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

//Функция добавления лайка карточке
const addLikeToCard = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, addLikeToCard };