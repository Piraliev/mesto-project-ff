//Функция открытия модального окна
const openModal = (modal, handleEscKeyUp) => {
  const popupCloseButton = modal.querySelector('.popup__close');
  
  modal.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleEscKeyUp);
  popupCloseButton.addEventListener('click', () => closeModal(modal));
  handleOverlayClick(modal);
}

//Функция закрытия модального окна
const closeModal = (modal, handleEscKeyUp) => {
  const popupCloseButton = modal.querySelector('.popup__close');

  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
  popupCloseButton.removeEventListener('click', closeModal);
}

//Функция обработки Esc
const handleEscKeyUp = (esc) => {
  if (esc.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup, handleEscKeyUp);
  }
};

//Функция обработки клика по оверлею
const handleOverlayClick = (modal) => {
  modal.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
}  
  
export { openModal, closeModal, handleEscKeyUp };