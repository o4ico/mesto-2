// Контейнер для карточек
const cardContainer = document.querySelector('.cards');

// Имя и информация о порльзователе
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Кнопки 
const editButton = document.querySelector('.profile__edit-button');// "Редактировать профиль"
const addButton = document.querySelector('.profile__add-button');// "Добавить карточку"
const imageButton = document.querySelector('.card__image');// открытия попапа с картинкой

// Попапы
const editPopup = document.querySelector('.popup_edit-profile');
const addPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');

// Элементы попапа с картинкой
const image = document.querySelector('.popup__image');
const imageTitle = document.querySelector('.popup__image-title');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close-button');

// Элементы попапа редактирования профиля
const formEdit = editPopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_about-me');
const buttonCloseEditPopup = editPopup.querySelector('.popup__close-button');
const popupSubmitButtonEdit = document.querySelector('.popup__submit-button_edit-profile');

// Элементы попапа добавления карточки
const formAdd = addPopup.querySelector('.popup__form');
const placeInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
const buttonCloseAddPopup = addPopup.querySelector('.popup__close-button');
const popupSubmitButtonAdd = document.querySelector('.popup__submit-button_add-card');

// Обработчик открытия попапа
function openPopup(popup) {

  popup.classList.add('popup_opened');

}

// Обработчик закрытия попапа
function closePopup(popup) {

  popup.classList.remove('popup_opened');

}

// Обработчик окрытия к кнопке "Редактировать профиль"
editButton.addEventListener('click', () => {

  openPopup(editPopup);

  // Переносим старое значение в поле
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

// Обработчик формы "Редактировать профиль"
function handleEditFormSubmit (evt) {

  evt.preventDefault(); // Отменяет стандартную отправку формы

  //Задаём новые значения
  profileTitle.textContent = nameInput.value; 
  profileSubtitle.textContent = jobInput.value;
  
  closePopup(editPopup);//Закрытие формы после редактирования профиля
}

// Обработчик открытия к кнопке Добавления карточки
addButton.addEventListener('click', () => openPopup(addPopup));

// Обработчик формы добавления карточки
function handleAddFormSubmit (evt, name, link) {
  evt.preventDefault(); // Отменяет стандартную отправку формы

  name = placeInput.value;
  link = linkInput.value;

  const newCard = createCard(name, link);
  cardContainer.prepend(newCard);

  closePopup(addPopup);

  placeInput.value = '';
  linkInput.value = '';
}

// Обработчикм к кнопке закрытия попапов
buttonCloseEditPopup.addEventListener('click', () => closePopup(editPopup));// "Редактировать"
buttonCloseAddPopup.addEventListener('click', () => closePopup(addPopup));// "Добавить карточку"
buttonCloseImagePopup.addEventListener('click', () => closePopup(imagePopup));// попапа с картинкой

// Обработчик к отправке формы "Редактировать профиль"
formEdit.addEventListener('submit', (evt) => {
  handleEditFormSubmit(evt);
});
formAdd.addEventListener('submit', handleAddFormSubmit);// Обработчик к отправке формы "Добавить карточку"

const createCard = (name, link) => {

  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);

  const card = cardTemplate.querySelector('.card');
  const cardText = cardTemplate.querySelector('.card__text');
  const cardImage = cardTemplate.querySelector('.card__image');
  const cardLikeButton = cardTemplate.querySelector('.card__like-button');
  const cardDeleteButton = cardTemplate.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardText.textContent = name;

  // Обработчик лайка
  cardLikeButton.addEventListener('click', (evt) => {

    evt.target.classList.toggle('card__like-button_active');

  });

  // Обработчик удаления карточки
  cardDeleteButton.addEventListener('click', () => {

    card.remove();

  });

  // Обработчик открытия попапа с картинкой
  cardImage.addEventListener('click', (evt) => {

    image.src = cardImage.src;
    image.alt = cardText.textContent;
    imageTitle.textContent = cardText.textContent;

    openPopup(imagePopup);
  })

  return cardTemplate;
}

const addInitialCards = initialCards.forEach( (item) => {

  const initialCardTamplate = createCard(item.name, item.link);
  cardContainer.append(initialCardTamplate);
});
