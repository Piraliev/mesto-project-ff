import { openModal, closeModal } from "./modal.js";
import { putLike, takeOffLike, deleteCardFromServer } from "./api.js";

const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;

// @todo: Функция создания карточки
function createCard(element, openImageHandler, likeCardHandler, userId) {
  const cardLikeList = element.likes;
  const cardTitle = element.name;
  const cardLink = element.link;
  const cardElement = cardTemplateContent.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCount = cardElement.querySelector('.card__like-count');

  //проверяем лайки пользователя, если он лайкал картинку, то закрасим сердечко
  cardLikeList.map((like) => {
    if (like._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    } else {
      likeButton.classList.remove('card__like-button_is-active');
    }
  })
  //добавляем кнопку удаления только карточкам пользователя
  if (element.owner._id === userId) {
    deleteButton.classList.add('card__delete-button-visible');
  } else {
    deleteButton.classList.remove('card__delete-button-visible');
  };
  
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', `Фотография - ${cardTitle}`);
  likesCount.textContent = element.likes.length;

  deleteButton.addEventListener('click', () =>  {
    const cardId = element._id;
    deleteCard(cardElement, cardId);
  });

  cardImage.addEventListener('click', openImageHandler);
  likeButton.addEventListener('mouseup', (event) => {
    likeCardHandler(event, element, likesCount);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card, cardId) {
  const cardModal = document.querySelector('.popup_delete-card');
  const deleteButton = cardModal.querySelector('.popup__button');
  const saveButton = cardModal.querySelector('.popup__button');

  openModal(cardModal);
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    saveButton.textContent = 'Удаление...';
    deleteCardFromServer(cardId);
    card.remove();
    closeModal(cardModal);
  });
  
}

//Функция управления лайком карточки
const switchLikeOnCard = (event, card, likesCount) => {
  const cardId = card._id;
  event.target.classList.toggle('card__like-button_is-active');
  
  if (event.target.classList.contains('card__like-button_is-active')) {
    putLike(cardId, likesCount);
  } else {
    takeOffLike(cardId, likesCount);
  }
}

export { createCard, deleteCard, switchLikeOnCard };