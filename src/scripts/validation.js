//Функция активации обработки валидации форм
const enableValidation = (validationConfigObject) => { 
  const formList = document.querySelectorAll(validationConfigObject.formSelector);

  formList.forEach((form) => {
    const inputList = form.querySelectorAll(validationConfigObject.inputSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => isValid(form, input));
    })
  })
}


// Функция проверки валидации
const isValid = (formElement, inputElement) => {
  const errorSpanElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (inputElement.validity.patternMismatch) {
    errorSpanElement.textContent = inputElement.dataset.errorMessage;
    showInputError(formElement, inputElement);
  } else {
    if (!inputElement.validity.valid) {
      errorSpanElement.textContent = inputElement.validationMessage;
      showInputError(formElement, inputElement);
      
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  toggleButtonState(formElement);
}

//Функция переключения состояния кнопки Submit
const toggleButtonState = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__button');

  if (inputList.every(inputElement => inputElement.validity.valid)) {
    submitButton.setAttribute('aria-disabled', 'false');
    submitButton.removeAttribute('disabled', true);
    submitButton.classList.remove('popup__button_disabled');
  } else {
    submitButton.setAttribute('aria-disabled', 'true');
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled');
  }
}

//Функция вывода сообщения об ошибке
const showInputError = (formElement, inputElement) => {
  const errorSpanElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorSpanElement.classList.add('popup__error_visible');
  inputElement.classList.add('popup__input_type_error');
}

//Функция скрытия сообщения об ошибке
const hideInputError = (formElement, inputElement) => {
  const errorSpanElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorSpanElement.textContent = '';
  errorSpanElement.classList.remove('popup__error_visible');
  inputElement.classList.remove('popup__input_type_error');
}

// Функция очистки ошибок валидации и управления активности кнопки
const clearValidation = (formElement, validationConfigObject) => {
  const submitButton = formElement.querySelector(validationConfigObject.submitButtonSelector);
  const inputList = formElement.querySelectorAll(validationConfigObject.inputSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  })
  
  submitButton.setAttribute('aria-disabled', 'true');
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(validationConfigObject.inactiveButtonClass);
}

export { enableValidation, showInputError, hideInputError, clearValidation, toggleButtonState };



