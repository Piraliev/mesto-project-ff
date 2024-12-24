import '../pages/index.css';
import { createCard, deleteCard, likeCardHandler } from './card.js';
import { openModal, closeModal, handleEscKeyUp, handleOverlayClick } from './modal.js';
import { enableValidation, showInputError, hideInputError, clearValidation } from './validation.js';
import { getUserProfile, getCardList, updateUserProfile, uploadNewCard, uploadNewAvatar, handleResponseError } from './api.js'

// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
const formElementTypeEdit = popupTypeEdit.querySelector('.popup__form');
const formElementNewCard = popupTypeNewCard.querySelector('.popup__form');
const formElementNewAvatar = popupUpdateAvatar.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const inputTitleAddNewCard = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const inputUrlAddNewCard = popupTypeNewCard.querySelector('.popup__input_type_url');
const inputUrlUpdateAvatar = popupUpdateAvatar.querySelector('.popup__input_avatar_url');
const avatarButton = document.querySelector('.profile__image-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


// @todo: Вывести карточки на страницу
const renderCards = (cardList, userProfile) => {
  const userId = userProfile._id;
  
  const cardsList = cardList.map((element) => {  
    return createCard(element, openImagePopupHandler, likeCardHandler, userId)
  });

  cardPlace.replaceChildren();
  cardsList.forEach((element) => {
    cardPlace.append(element);
  })
}

popups.forEach((popup) => {
  handleOverlayClick(popup);
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
});



//Функция обработки открытия редактирования профиля
const onEditProfileButtonClick = () => {
  openModal(popupTypeEdit);
  formElementTypeEdit.addEventListener('submit', onSaveProfileButtonClick);
  clearValidation(formElementTypeEdit, validationConfig);
  const saveButton = popupTypeEdit.querySelector('.popup__button');

  saveButton.textContent = 'Сохранить';

  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
}

//Функция обработки сохранения профиля
const onSaveProfileButtonClick = async (event) => {
  event.preventDefault();

  const newName = nameInput.value;
  const newAbout = aboutInput.value;
  const saveButton = popupTypeEdit.querySelector('.popup__button');

  try {
    const updateUserProfileResponse = await updateUserProfile(newName, newAbout)
    profileName.textContent = updateUserProfileResponse.name;
    profileDescription.textContent = updateUserProfileResponse.about;
    formElementTypeEdit.removeEventListener('submit', onSaveProfileButtonClick);
    closeModal(popupTypeEdit);
  } catch {
    handleResponseError(err)
  } finally {
    saveButton.textContent = 'Сохранение...';
  }
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
  formElementNewCard.addEventListener('submit', onSaveNewCardButtonClick);
  const saveButton = popupTypeNewCard.querySelector('.popup__button');
  saveButton.textContent = 'Создать';
  clearValidation(formElementNewCard, validationConfig);
  formElementNewCard.reset();
}

//Функция сохранения новой карточки
const onSaveNewCardButtonClick = async (event) => {
  event.preventDefault();
  
  const titleInputValue = inputTitleAddNewCard.value;
  const urlInputValue = inputUrlAddNewCard.value;
  const saveButton = popupTypeNewCard.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  saveButton.setAttribute('aria-disabled', 'true');
  saveButton.setAttribute('disabled', true);
  try {
    const newCard = await uploadNewCard(titleInputValue, urlInputValue);
    const userId = newCard.owner._id;

    cardPlace.prepend(createCard(newCard, openImagePopupHandler, likeCardHandler, userId));
    formElementNewCard.reset();
    clearValidation(formElementNewCard, validationConfig);
    formElementNewCard.removeEventListener('submit', onSaveNewCardButtonClick);
    closeModal(popupTypeNewCard);
  } catch {
    handleResponseError(err);
  }
}

//Функция сохранения нового аватара
const onSaveNewAvatarButtonClick = async (event) => {
  event.preventDefault();

  const newAvatarLink = inputUrlUpdateAvatar.value;
  const saveButton = popupUpdateAvatar.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  try {
    const uploadNewAvatarResponse = await uploadNewAvatar(newAvatarLink);

    const avatarLink = uploadNewAvatarResponse.avatar;
    profileImage.setAttribute('style', `background-image: url(${avatarLink})`);
    formElementNewAvatar.reset();
    clearValidation(formElementNewAvatar, validationConfig);
    formElementNewAvatar.removeEventListener('submit', onSaveNewAvatarButtonClick);
    closeModal(popupUpdateAvatar);
  } catch {
    handleResponseError(err);
  } 
}
 
editProfileButton.addEventListener('click', onEditProfileButtonClick);
addCardButton.addEventListener('click', onAddNewCardButtonClick);
avatarButton.addEventListener('click', () => {
  const saveButton = popupUpdateAvatar.querySelector('.popup__button');
  clearValidation(formElementNewAvatar, validationConfig);
  saveButton.textContent = 'Сохранить';
  openModal(popupUpdateAvatar);
  formElementNewAvatar.addEventListener('submit', onSaveNewAvatarButtonClick);
})

const popupList = document.querySelectorAll('.popup');
  popupList.forEach((item) => {
    item.classList.add('popup_is-animated');
  })

Promise.all([getUserProfile(), getCardList()])
  .then(([resUserProfile, resCardList]) => {
    profileImage.setAttribute('style', `background-image: url(${resUserProfile.avatar})`);
    profileName.textContent = resUserProfile.name;
    profileDescription.textContent = resUserProfile.about;
    
    renderCards(resCardList, resUserProfile);
  })
  .catch(err => handleResponseError(err))
  
enableValidation(validationConfig);
  