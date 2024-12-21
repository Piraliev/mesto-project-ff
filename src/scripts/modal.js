//Функция открытия модального окна
const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
}

//Функция закрытия модального окна
const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleEscKeyUp);
}

//Функция обработки Esc
const handleEscKeyUp = (esc) => {
  if (esc.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
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
  
export { openModal, closeModal, handleEscKeyUp, handleOverlayClick };