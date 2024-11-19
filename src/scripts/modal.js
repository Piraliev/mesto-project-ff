//Функция открытия модального окна
const openModal = (modal, handleEscKeyUp) => {
  const popupCloseButton = modal.querySelector('.popup__close');
  
  modal.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleEscKeyUp);
  popupCloseButton.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
}

//Функция закрытия модального окна
const closeModal = (modal, handleEscKeyUp) => {
  const popupCloseButton = modal.querySelector('.popup__close');

  modal.classList.remove('popup_is-opened');
  modal.querySelector('.popup__form').reset();
  document.removeEventListener('keydown', handleEscKeyUp);
  popupCloseButton.removeEventListener('click', closeModal);
}

export { openModal, closeModal };