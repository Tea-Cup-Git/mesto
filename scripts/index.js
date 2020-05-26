// Объект с настройками валидации
const validationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}

// Переменные для работы с карточками
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Архыз'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Челябинская область'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Иваново'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатка'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Холмогорский район'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Байкал'
  }
];
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.photo-grid');

// Переменные для кнопок
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditFormButton = document.querySelector('#edit-form_close-button');
const closeAddFormButton = document.querySelector('#add-form_close-button');
const closeImageButton = document.querySelector('#image-expander_close-button');

// Переменные для элементов Pop-Up
const popupEditProfile = document.querySelector('#edit-form');
const popupAddCard = document.querySelector('#add-form');
const popupImage = document.querySelector('#image-expander');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formProfile = document.querySelector('#edit-form_container');
const formAddCard = document.querySelector('#add-form_container');
const inputProfileName = document.querySelector('.popup__input_type_user-name');
const inputProfileAbout = document.querySelector('.popup__input_type_user-about');
const inputCardName = document.querySelector('.popup__input_type_place-name');
const inputCardImage = document.querySelector('.popup__input_type_image-link');

// Функция: закрыть Pop-Up при клике на ESC и Overlay
function closePopupOnEvent(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
  if (event.key === 'Escape') {
    const popupElement = document.querySelector('.popup_open');
    closePopup(popupElement);
  }
}

// Функция: добавить/снять слушатели ESC и Overlay
function toggleEventListeners(popupElement) {
  if (popupElement.classList.contains('popup_open')) {
    document.addEventListener('mousedown', closePopupOnEvent);
    document.addEventListener('keydown', closePopupOnEvent);
  } else {
    document.removeEventListener('mousedown', closePopupOnEvent);
    document.removeEventListener('keydown', closePopupOnEvent);
  }
}

// Функция: открыть Pop-Up
function openPopup(popupElement) {
  // Зачистка ошибок при открытии формы
  if (popupAddCard) {
    document.querySelector('#name-input-error').textContent = '';
    document.querySelector('#link-input-error').textContent = '';
  }
  if (popupEditProfile) {
    document.querySelector('#user-input-error').textContent = '';
    document.querySelector('#about-input-error').textContent = '';
  }
  toggleEventListeners(popupElement);
  popupElement.classList.add('popup_open');
}

// Функция: закрыть Pop-Up
function closePopup(popupElement) {
  toggleEventListeners(popupElement);
  popupElement.classList.remove('popup_open');
}

// Функция: открыть Pop-Up редактирования профиля
function openProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  //buttonElement.disabled = true;
  openPopup(popupEditProfile);
}

// Функция: сохранить данные профиля
function handleProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupEditProfile);
}

// Функция: развернуть картинку
function expandImage(event) {
  document.querySelector('.popup__image').src = event.target.src;
  document.querySelector('.popup__image').alt = event.target.alt;
  document.querySelector('.popup__figcaption').textContent = event.target.alt;
  openPopup(popupImage);
}

// Функция: переключатель лайков
function toggleLike(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_active');
  }
};

// Функция: клонировать и заполнить шаблон карточки
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__name').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.alt;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__trash-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__image').addEventListener('click', expandImage);
  cardsContainer.addEventListener('click', toggleLike);
  return cardElement;
}

// Функция: отобразить карточку на странице
function renderCard(item) {
  cardsContainer.prepend(createCard(item));
}

// Функция: отобразить дефолтные карточки на странице
initialCards.forEach(renderCard);

// Функция: создать новую карточку
function handleAddCardSubmit(event) {
  event.preventDefault();
  const userCard = {
    name: inputCardName.value,
    link: inputCardImage.value,
    alt: inputCardName.value
  };
  renderCard(userCard);
  closePopup(popupAddCard);
  formAddCard.reset();
}

// Функция: удалить карточку
function handleDelete(event) {
  const cardElement = event.target.closest('.card');
  cardElement.querySelector('.card__trash-button').removeEventListener('click', handleDelete);
  cardElement.querySelector('.card__image').removeEventListener('click', expandImage);
  cardsContainer.removeEventListener('click', toggleLike);
  cardsContainer.removeChild(cardElement);
}

// Обработчики кнопок
editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', () => openPopup(popupAddCard));
closeEditFormButton.addEventListener('click', () => closePopup(popupEditProfile));
closeAddFormButton.addEventListener('click', () => closePopup(popupAddCard));
closeImageButton.addEventListener('click', () => closePopup(popupImage));
formProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
