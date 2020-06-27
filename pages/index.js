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
  popupExpandedImage,
  profileName,
  profileAbout,
  formProfile,
  formAddCard,
  inputCardName,
  inputCardImage
} from '../utils/constants.js';

// Включить валидацию форм
const formProfileValidator = new FormValidator(formConfig, formProfile);
formProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(formConfig, formAddCard);
formAddCardValidator.enableValidation();

// Загрузить дефолтные карточки
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      item,
      handleCardClick: (event) => {
        popupWithImage.open(event);
      }
    }, '#card-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement, true);
  }
}, cardsContainer);
cardsList.renderItems();

// Данные пользователя
const userInfo = new UserInfo({
  userNameSelector: profileName,
  userAboutSelector: profileAbout
});

// Pop-Up редактирования профиля
const popupWithProfileForm = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: () => {
    userInfo.setUserInfo();
  }
});
popupWithProfileForm.setEventListeners();

// Pop-Up с картинкой
const popupWithImage = new PopupWithImage(popupExpandedImage);
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
      handleCardClick: (event) => {
        popupWithImage.open(event);
      }
    }, '#card-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
});
popupWithAddForm.setEventListeners();

// Обработчики кнопок
editFormButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  popupWithProfileForm.open();
});
addFormButton.addEventListener('click', () => {
  popupWithAddForm.open();
});
