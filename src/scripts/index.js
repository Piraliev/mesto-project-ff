import '../pages/index.css';
import { initialCards } from '../data/cards.js';
import { createCard, addLikeToCard } from './card.js';
import { openModal, closeModal, handleEscKeyUp } from './modal.js';

// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// @todo: Теймплейт карточки
const cardTemplateId = document.querySelector('#card-template');
const cardTemplateContent = cardTemplateId.content;

// @todo: Вывести карточки на страницу
const renderCards = () => {
  const cardsList = initialCards.map((element) => {
    const cardTemplateClone = cardTemplateContent.cloneNode(true);
    return createCard(element, openImagePopupHandler, addLikeToCard, cardTemplateClone)
  });
  
  cardPlace.replaceChildren();
  cardsList.forEach((element) => {
    cardPlace.append(element);
  })
}



//Функция обработки открытия редактирования профиля
const onEditProfileButtonClick = () => {
  openModal(popupTypeEdit, handleEscKeyUp);

  const profileName = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  nameInput.value = profileName;
  jobInput.value = profileDescription;
  formElement.addEventListener('submit', onSaveProfileButtonClick, {once: true});
}

//Функция обработки сохранения профиля
const onSaveProfileButtonClick = (event) => {
  event.preventDefault();

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit, handleEscKeyUp);
}

//Функция обработки открытия фотографии
const openImagePopupHandler = (event) => {
  openModal(popupTypeImage, handleEscKeyUp);

  const imageElement = event.target;
  const srcImageElement = imageElement.getAttribute('src');
  const altImageElement = imageElement.getAttribute('alt');
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');
  const titleImage = imageElement.closest('.card').querySelector('.card__title').textContent;

  popupImage.setAttribute('src', srcImageElement);
  popupImage.setAttribute('alt', altImageElement);
  popupCaption.textContent = titleImage;
}

//Функция добавления новой карточки
const onAddNewCardButtonClick = () => {
  openModal(popupTypeNewCard, handleEscKeyUp);

  const popupForm = popupTypeNewCard.querySelector('.popup__form');
  const titleInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
  const urlInput = popupTypeNewCard.querySelector('.popup__input_type_url');
  
  titleInput.value = '';
  urlInput.value = '';

  popupForm.addEventListener('submit', onSaveNewCardButtonClick, {once: true});
}

//Функция сохранения новой карточки
const onSaveNewCardButtonClick = (event) => {
  event.preventDefault();
 
  const titleInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
  const urlInput = popupTypeNewCard.querySelector('.popup__input_type_url');
  const titleInputValue = titleInput.value;
  const urlInputValue = urlInput.value;
  const newCard = {
    name: titleInputValue,
    link: urlInputValue
  }

  initialCards.unshift(newCard);
  
  renderCards();
  titleInput.value = '';
  urlInput.value = '';
  closeModal(popupTypeNewCard, handleEscKeyUp);
}
 
const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', onEditProfileButtonClick);

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', onAddNewCardButtonClick);

const popupList = document.querySelectorAll('.popup');
  popupList.forEach((item) => {
    item.classList.add('popup_is-animated');
  })

renderCards();
