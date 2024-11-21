import '../pages/index.css';
import { initialCards } from '../data/cards.js';
import { createCard, deleteCard, addLikeToCard } from './card.js';
import { openModal, closeModal, handleEscKeyUp, handleOverlayClick } from './modal.js';

// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formElementTypeEdit = popupTypeEdit.querySelector('.popup__form');
const formElementNewCard = popupTypeNewCard.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const inputTitleAddNewCard = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const inputUrlAddNewCard = popupTypeNewCard.querySelector('.popup__input_type_url');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');

// @todo: Вывести карточки на страницу
const renderCards = () => {
  const cardsList = initialCards.map((element) => {
    return createCard(element, openImagePopupHandler, addLikeToCard)
  });

  cardPlace.replaceChildren();
  cardsList.forEach((element) => {
    cardPlace.append(element);
  })
}

//Функция обработки открытия редактирования профиля
const onEditProfileButtonClick = () => {
  openModal(popupTypeEdit);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

//Функция обработки сохранения профиля
const onSaveProfileButtonClick = (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

//Функция обработки открытия фотографии
const openImagePopupHandler = (event) => {
  openModal(popupTypeImage);

  const imageElement = event.target;
  const srcImageElement = imageElement.getAttribute('src');
  const altImageElement = imageElement.getAttribute('alt');
  const titleImage = imageElement.closest('.card').querySelector('.card__title').textContent;

  popupImage.setAttribute('src', srcImageElement);
  popupImage.setAttribute('alt', altImageElement);
  popupImageCaption.textContent = titleImage;
}

//Функция открытия формы добавления новой карточки
const onAddNewCardButtonClick = () => {
  openModal(popupTypeNewCard);

  formElementNewCard.reset();
}

//Функция сохранения новой карточки
const onSaveNewCardButtonClick = (event) => {
  event.preventDefault();
 
  const titleInputValue = inputTitleAddNewCard.value;
  const urlInputValue = inputUrlAddNewCard.value;
  const newCard = {
    name: titleInputValue,
    link: urlInputValue
  };
  
  cardPlace.prepend(createCard(newCard, openImagePopupHandler, addLikeToCard));
  formElementNewCard.reset();
  closeModal(popupTypeNewCard);
}

popups.forEach((popup) => {
  handleOverlayClick(popup);
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
});

formElementTypeEdit.addEventListener('submit', onSaveProfileButtonClick, {once: true});
formElementNewCard.addEventListener('submit', onSaveNewCardButtonClick, {once: true});
 
editProfileButton.addEventListener('click', onEditProfileButtonClick);
addCardButton.addEventListener('click', onAddNewCardButtonClick);

const popupList = document.querySelectorAll('.popup');
  popupList.forEach((item) => {
    item.classList.add('popup_is-animated');
  })

renderCards();
