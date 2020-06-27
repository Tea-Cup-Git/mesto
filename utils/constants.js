// Массив дефолтных карточек
export const initialCards = [
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

// Конфиг для валидации
export const formConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active'
};

// Переменные для работы с карточками
export const cardsContainer = document.querySelector('.photo-grid');

// Переменные для кнопок
export const editFormButton = document.querySelector('.profile__edit-button');
export const addFormButton = document.querySelector('.profile__add-button');

// Переменные для элементов Pop-Up
export const popupEditProfile = document.querySelector('#edit-form');
export const popupAddCard = document.querySelector('#add-form');
export const popupExpandedImage = document.querySelector('#image-expander');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const formProfile = document.querySelector('#edit-form_container');
export const formAddCard = document.querySelector('#add-form_container');
export const inputProfileName = document.querySelector('.popup__input_type_user-name');
export const inputProfileAbout = document.querySelector('.popup__input_type_user-about');
export const inputCardName = document.querySelector('.popup__input_type_place-name');
export const inputCardImage = document.querySelector('.popup__input_type_image-link');
