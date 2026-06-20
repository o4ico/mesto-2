const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
//const formError = formElement.querySelector(`.${formInput.id}_text-error`);

// Передадим текст ошибки вторым параметром
const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}_text-error`); //это поиск span

  //console.log(`это объект DOM span${formError}`);
  //console.log(`а тут должны быть его свойства? textContent ${formError.textContent}, className ${formError.className}`);

  inputElement.classList.add('popup__input_error');//это добавление стиля с красной линией
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  formError.classList.add('popup__text-error');//это добавление класса с краснным текстом ошибки для span
};

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}_text-error`); //это поиск span

  inputElement.classList.remove('popup__input_error');//это удаление стиля с красной линией
  // Очистим ошибку
  formError.textContent = '';
  formError.classList.remove('popup__text-error');//это удаление класса с краснным текстом ошибки для span
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    //console.log(`это объект validationMessage${inputElement.validationMessage}`);

    showInputError(formElement, inputElement, inputElement.validationMessage);

    //console.log(`это объект DOM span${formError}`);
    //console.log(`а тут должны быть его свойства? textContent ${formError.textContent}, className ${formError.className}`);
  } else {
    hideInputError(formElement, inputElement);
  }
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});


//Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));// сделаем массив из всех полей в форме

  inputList.forEach((inputElement) => {
    
    inputElement.addEventListener('input', () => {// каждому полю добавим обработчик события input

      isValid(formElement, inputElement);// внутри вызовем isValid передав перебираемый элемент формы

    });

  });
};

//Добавление обработчиков всем формам

const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll('.popup__form'));// массив из всех форм

  formList.forEach((formElement) => {// каждой форме добавим setEventListeners который добавляет обработчик всем полям формы

    setEventListeners(formElement);

  });

};

// Вызовем функцию
enableValidation(); 


// Валидация работает для всех форм и полей но нужно заблокировать кнопку "сохранить", если хоть одно поле неправильное.