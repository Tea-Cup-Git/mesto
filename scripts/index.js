import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Конфиг для валидации
const formConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active'
};

// Переменные для работы с карточками
const cardsContainer = document.querySelector('.photo-grid');
import {initialCards} from './initialCards.js';

// Переменные для кнопок
const editFormButton = document.querySelector('.profile__edit-button');
const addFormButton = document.querySelector('.profile__add-button');
const closeEditFormButton = document.querySelector('#edit-form_close-button');
const closeAddFormButton = document.querySelector('#add-form_close-button');
const closeImageButton = document.querySelector('#image-expander_close-button');
const submitAddButton = document.querySelector('#add-form-submit');
const submitEditButton = document.querySelector('#edit-form-submit');

// Переменные для элементов Pop-Up
const popupEditProfile = document.querySelector('#edit-form');
const popupAddCard = document.querySelector('#add-form');
import {popupExpandedImage} from './utils.js';
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formProfile = document.querySelector('#edit-form_container');
const formAddCard = document.querySelector('#add-form_container');
const inputProfileName = document.querySelector('.popup__input_type_user-name');
const inputProfileAbout = document.querySelector('.popup__input_type_user-about');
const inputCardName = document.querySelector('.popup__input_type_place-name');
const inputCardImage = document.querySelector('.popup__input_type_image-link');


// Включить валидацию форм
const formProfileValidator = new FormValidator(formConfig, formProfile);
formProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(formConfig, formAddCard);
formAddCardValidator.enableValidation();

// Очистить ошибки полей ввода
function resetErrors(popupElement) {
  const errors = popupElement.querySelectorAll('.popup__input-error');
  errors.forEach(error => error.classList.remove('popup__input-error_active'));
}

// Открыть Pop-Up
import {openPopup} from './utils.js';

// Закрыть Pop-Up
import {closePopup} from './utils.js';

// Открыть Pop-Up редактирования профиля
function openProfilePopup() {
  resetErrors(popupEditProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
}

// Сохранить данные профиля
function handleProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupEditProfile);
  // Сброс состояния кнопки
  submitEditButton.classList.add(formConfig.inactiveButtonClass);
  submitEditButton.disabled = true;
}

// Открыть Pop-Up добавления карточки
function openAddCardPopup() {
  resetErrors(popupAddCard);
  openPopup(popupAddCard);
}

// Загрузить дефолтные карточки
initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();
  cardsContainer.appendChild(cardElement);
});

// Создать новую карточку
function handleAddCardSubmit(event) {
  event.preventDefault();
  const userCard = new Card({
    name: inputCardName.value,
    link: inputCardImage.value,
    alt: inputCardName.value
  }, '#card-template');
  const cardElement = userCard.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAddCard);
  // Сброс полей ввода
  formAddCard.reset();
  // Сброс состояния кнопки
  submitAddButton.classList.add(formConfig.inactiveButtonClass);
  submitAddButton.disabled = true;
}

// Обработчики кнопок
editFormButton.addEventListener('click', openProfilePopup);
addFormButton.addEventListener('click', openAddCardPopup);
closeEditFormButton.addEventListener('click', () => closePopup(popupEditProfile));
closeAddFormButton.addEventListener('click', () => closePopup(popupAddCard));
closeImageButton.addEventListener('click', () => closePopup(popupExpandedImage));
formProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
