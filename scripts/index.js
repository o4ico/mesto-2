//Имя и информация о порльзователе
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Кнопка "Редактировать"
const profileEditButton = document.querySelector('.profile__edit-button');

//Попап
const popup = document.querySelector('.popup');

//Кнопки попапа
const popupCloseButton = document.querySelector('.popup__close-button');
const popupSubmitButton = document.querySelector('.popup__submit-button');

//Форма в DOM
const formElement = document.querySelector('.popup__form');
//Поля формы в DOM
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_about-me');

//Обработчик открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//Обработчик закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы

  //Задаём новые значения
  profileTitle.textContent = nameInput.value; 
  profileSubtitle.textContent = jobInput.value;
  
  closePopup();//Закрытие формы после редактирования профиля
}

profileEditButton.addEventListener('click', openPopup);// Обработчик к кнопке "Редактировать"
popupCloseButton.addEventListener('click', closePopup);// Обработчик к кнопке Закрытия
formElement.addEventListener('submit', handleFormSubmit);// Обработчик к отправке формы