const form = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__text-error_active'
};

const formElement = document.querySelector('.popup__form');

const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}_text-error`); // это поиск span

  inputElement.classList.add(form.inputErrorClass);// это добавление стиля с красной линией
  
  formError.textContent = errorMessage;// заменим содержимое span с ошибкой на переданный параметр
  formError.classList.add(form.errorClass);// это добавление класса с краснным текстом ошибки для span
};

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}_text-error`); // это поиск span

  inputElement.classList.remove(form.inputErrorClass);// это удаление стиля с красной линией
  // Очистим ошибку
  formError.textContent = '';
  formError.classList.remove(form.errorClass);// это удаление класса с краснным текстом ошибки для span
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage);// передаем сообщение об ошибке вторым аргументом

  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidTnput = (inputList) => {// проверка есть ли невалидные поля в форме

  return inputList.some((inputElement) => {//если нет, то вернет false

    return !inputElement.validity.valid;//если есть, вернет true
  })
}

const toggleButtonState = (inputList, buttonElement) => {//Включение/отключение кнопки "Отправить"

  if (hasInvalidTnput(inputList)) {

    buttonElement.classList.add(form.inactiveButtonClass);//изменение стиля
    buttonElement.disabled = true;//блокировка возможности нажатия
  } else {

    buttonElement.classList.remove(form.inactiveButtonClass);
    buttonElement.disabled = false;
  }
} 

const resetForm = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
  const buttonElement = formElement.querySelector(form.submitButtonSelector);

  inputList.forEach((inputElement) => {// сброс ошибки для каждого поля
    
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);// заранее заблокировать кнопку
}

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});


//Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));// сделаем массив из всех полей в форме
  const buttonElement = formElement.querySelector(form.submitButtonSelector);



  inputList.forEach((inputElement) => {
    
    inputElement.addEventListener('input', () => {// каждому полю добавим обработчик события input

      isValid(formElement, inputElement);// внутри вызовем isValid передав перебираемый элемент формы
      toggleButtonState(inputList, buttonElement);//

    });
  });
};

// Добавление обработчиков всем формам

const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll(form.formSelector));// массив из всех форм

  formList.forEach((formElement) => {// кКаждой форме добавим setEventListeners который добавляет обработчик всем полям формы

    setEventListeners(formElement);

  });

};

enableValidation(); 