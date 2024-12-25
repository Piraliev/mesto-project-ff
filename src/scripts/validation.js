//Функция активации обработки валидации форм
const enableValidation = (validationConfig) => { 
  const formList = document.querySelectorAll(validationConfig.formSelector);

  formList.forEach((form) => {
    const inputList = form.querySelectorAll(validationConfig.inputSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => isValid(form, input, validationConfig));
    })
  })
}

// Функция проверки валидации
const isValid = (formElement, inputElement, validationConfig) => {
  const errorSpanElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (inputElement.validity.patternMismatch) {
    errorSpanElement.textContent = inputElement.dataset.errorMessage;
    showInputError(formElement, inputElement, validationConfig);
  } else {
    if (!inputElement.validity.valid) {
      errorSpanElement.textContent = inputElement.validationMessage;
      showInputError(formElement, inputElement, validationConfig);
      
    } else {
      hideInputError(formElement, inputElement, validationConfig); 
    }
  }
  toggleButtonState(formElement, validationConfig);
}

//Функция переключения состояния кнопки Submit
const toggleButtonState = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  if (inputList.every(inputElement => inputElement.validity.valid)) {
    submitButton.setAttribute('aria-disabled', 'false');
    submitButton.removeAttribute('disabled', true);
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    submitButton.setAttribute('aria-disabled', 'true');
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  }
}

//Функция вывода сообщения об ошибке
const showInputError = (formElement, inputElement, validationConfig) => {
  const errorSpanElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorSpanElement.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
}

//Функция скрытия сообщения об ошибке
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorSpanElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorSpanElement.textContent = '';
  errorSpanElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

// Функция очистки ошибок валидации и управления активности кнопки
const clearValidation = (formElement, validationConfig) => {
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  })
  toggleButtonState(formElement, validationConfig);
}

export { enableValidation, showInputError, hideInputError, clearValidation, toggleButtonState };



