const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');

const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}_text-error`); // это поиск span

  inputElement.classList.add('popup__input_error');// это добавление стиля с красной линией
  
  formError.textContent = errorMessage;// заменим содержимое span с ошибкой на переданный параметр
  formError.classList.add('popup__text-error_active');// это добавление класса с краснным текстом ошибки для span
};

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}_text-error`); // это поиск span

  inputElement.classList.remove('popup__input_error');// это удаление стиля с красной линией
  // Очистим ошибку
  formError.textContent = '';
  formError.classList.remove('popup__text-error_active');// это удаление класса с краснным текстом ошибки для span
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

    buttonElement.classList.add('popup__submit-button_disabled');//изменение стиля
    buttonElement.disabled = true;//блокировка возможности нажатия
  } else {

    buttonElement.classList.remove('popup__submit-button_disabled');
    buttonElement.disabled = false;
  }
} 


formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});


//Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));// сделаем массив из всех полей в форме
  const buttonElement = formElement.querySelector('.popup__submit-button');

  toggleButtonState(inputList, buttonElement);// заранее заблокировать кнопку

  inputList.forEach((inputElement) => {
    
    inputElement.addEventListener('input', () => {// каждому полю добавим обработчик события input

      isValid(formElement, inputElement);// внутри вызовем isValid передав перебираемый элемент формы
      toggleButtonState(inputList, buttonElement);//

    });
  });
};

// Добавление обработчиков всем формам

const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll('.popup__form'));// массив из всех форм

  formList.forEach((formElement) => {// кКаждой форме добавим setEventListeners который добавляет обработчик всем полям формы

    setEventListeners(formElement);

  });

};

enableValidation(); 