//Кнопка "Редактировать"
const profileEditButton = document.querySelector('.profile__edit-button');

//Попап
const popup = document.querySelector('.popup');

//Кнопка закрытия попапа
const popupCloseButton = document.querySelector('.popup__close-button');

//Обработчик открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
}

//Обработчик закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);// Обработчик к кнопке "Редактировать"
popupCloseButton.addEventListener('click', closePopup);// Обработчик к кнопке Закрытия