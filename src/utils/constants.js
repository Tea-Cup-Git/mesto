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
export const avatarFormButton = document.querySelector('.profile__avatar-button')

// Переменные для элементов Pop-Up
export const popupEditProfile = document.querySelector('#edit-form');
export const popupAddCard = document.querySelector('#add-form');
export const popupExpandedImage = document.querySelector('#image-expander');
export const popupConfirmDelete = document.querySelector('#confirm-delete');
export const popupChangeAvatar = document.querySelector('#change-avatar');
