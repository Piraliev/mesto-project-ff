import { openModal, closeModal } from "./modal.js";
import { putLike, takeOffLike, deleteCardFromServer, handleResponseError } from "./api.js";

const cardTemplate = document.querySelector('#card-template');
const cardDeleteModal = document.querySelector('.popup_delete-card');
const submitModalButton = cardDeleteModal.querySelector('.popup__button');
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
    openModal(cardDeleteModal);
    submitModalButton.textContent = 'Да';
    cardDeleteModal.onsubmit = (event) => deleteCard(event, element, cardElement);
  });

  cardImage.addEventListener('click', openImageHandler);
  likeButton.addEventListener('mouseup', (event) => {
    likeCardHandler(event, element, likesCount);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event, card, cardElement) {
  event.preventDefault();

  deleteCardFromServer(card._id)
    .then(() => {
      closeModal(cardDeleteModal);
      cardElement.remove();
    })
    .catch(err => handleResponseError(err))
    .finally(() => {
      submitModalButton.textContent = 'Удаление...';
    })
}

//Функция управления лайком карточки
const likeCardHandler = (event, card, likesCount) => {
  const likeButton = event.target;
  const cardId = card._id;
  if (likeButton.classList.contains('card__like-button_is-active')) {
    takeOffLike(cardId)
      .then((res) => {
        likeButton.classList.remove('card__like-button_is-active')
        likesCount.textContent = res.likes.length
      })
      .catch(err => handleResponseError(err))
  } else {
    putLike(cardId)
      .then((res) => {
        likeButton.classList.add('card__like-button_is-active')
        likesCount.textContent = res.likes.length
      })
      .catch(err => handleResponseError(err))
  }
}

export { createCard, deleteCard, likeCardHandler };