import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  formConfig,
  cardsContainer,
  editFormButton,
  addFormButton,
  popupEditProfile,
  popupAddCard,
  popupExpandedImage
} from '../utils/constants.js';
import './index.css';

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

// Данные пользователя
const userInfo = new UserInfo({
  user: {
    name: profileName,
    about: profileAbout
  },
  input: {
    name: inputProfileName,
    about: inputProfileAbout
  }
});

// Pop-Up редактирования профиля
const popupWithProfileForm = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
  }
}, formProfileValidator);
popupWithProfileForm.setEventListeners();

// Загрузить дефолтные карточки
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: ({link, alt}) => {
        popupWithImage.open({link, alt});
      }
    }, '#card-template');
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardsContainer);
cardList.renderItems();

// Pop-Up с картинкой
const popupWithImage = new PopupWithImage({
  popupSelector: popupExpandedImage,
  imageSelector: '.popup__image'
});
popupWithImage.setEventListeners();

// Pop-Up добавления карточки
const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: () => {
    const card = new Card({
      item: {
        name: inputCardName.value,
        link: inputCardImage.value,
        alt: inputCardName.value
      },
      handleCardClick: ({link, alt}) => {
      popupWithImage.open({link, alt});
      }
    }, '#card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, formAddCardValidator);
popupWithAddForm.setEventListeners();

// Обработчики кнопок
editFormButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  popupWithProfileForm.open();
});
addFormButton.addEventListener('click', () => {
  popupWithAddForm.open();
});
