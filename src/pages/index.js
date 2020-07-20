import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import FormValidator from '../components/FormValidator.js';
import {
  formConfig,
  cardsContainer,
  editFormButton,
  addFormButton,
  avatarFormButton,
  popupEditProfile,
  popupAddCard,
  popupExpandedImage,
  popupConfirmDelete,
  popupChangeAvatar
} from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js'
import './index.css';

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const formProfile = document.querySelector('#edit-form_container');
const formAddCard = document.querySelector('#add-form_container');
const formAvatar = document.querySelector('#avatar-form_container');
const inputProfileName = document.querySelector('.popup__input_type_user-name');
const inputProfileAbout = document.querySelector('.popup__input_type_user-about');
const inputProfileAvatar = document.querySelector('#avatar-input');
const figCaption = document.querySelector('.popup__figcaption');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  token: '05e19680-152e-4468-99ab-dd133195a5d0'
})

const formProfileValidator = new FormValidator(formConfig, formProfile);
const formAddCardValidator = new FormValidator(formConfig, formAddCard);
const formAvatarValidator = new FormValidator(formConfig, formAvatar);
// Pop-Up с картинкой
const popupWithImage = new PopupWithImage({
  popupSelector: popupExpandedImage,
  imageSelector: '.popup__image',
  textSelector: figCaption
});
// Pop-Up подтверждения удаления карточки
const popupWithConfirm = new PopupWithConfirm(popupConfirmDelete);

api.getAllData()
  .then(([ cardsArray, userData ]) => {
    const getCardData = (cardData) => {
      return {
        data: { ...cardData, myID: userData._id },
        handleCardClick: (cardData) => {
          popupWithImage.open(cardData);
        },
        handleLikeClick: (card) => {
          if(!card.isLiked()) {
            api.putLike(card.id())
              .then(data => {
                const index = cardsArray.findIndex(item => item._id === card.id());
                cardsArray.splice(index, 1, data);
                card.setLikesInfo({...data});
              })
          } else {
            api.removeLike(card.id())
              .then(data => {
                const index = cardsArray.findIndex(item => item._id === card.id());
                cardsArray.splice(index, 1, data);
                card.setLikesInfo({...data});
              })
          }

        },
        handleDeleteButtonClick: (card) => {
          popupWithConfirm.open();
          popupWithConfirm.setSubmit(() => {
            api.removeCard(card.id())
              .then(() => {
                cardsArray = cardsArray.filter(item => {
                  return item._id !== card.id();
                });
                card.removeCard()
              })
              .finally(() => {
                popupWithConfirm.close();
              });
          });
        }
      }
    }

    // Данные пользователя
    const userInfo = new UserInfo({
      userName: profileName,
      userAbout: profileAbout,
      userAvatar: profileAvatar
    });

    userInfo.setUserInfo({
      userName: userData.name,
      userAbout: userData.about,
      userAvatar: userData.avatar
    });

    // Pop-Up редактирования профиля
    const popupWithProfileForm = new PopupWithForm({
      popupSelector: popupEditProfile,
      handleFormSubmit: (data) => {
        api.setUserInfo({
          name: data.userName,
          about: data.userAbout
        })
          .then((result) => {
            userInfo.setUserInfo({
              userName: result.name,
              userAbout: result.about
            })
          })
          .finally(() => {
            renderLoading();
            popupWithProfileForm.close();
          });
      }
    }, formProfileValidator, formConfig);

    // Pop-Up редактирования аватара
    const popupWithAvatar = new PopupWithForm({
      popupSelector: popupChangeAvatar,
      handleFormSubmit: (data) => {
        api.setUserAvatar({
          avatar: data.userAvatar
        })
          .then((result) => {
            userInfo.setUserInfo({
              userAvatar: result.avatar
            })
          })
          .finally(() => {
            renderLoading();
            popupWithAvatar.close();
          });
      }
    }, formProfileValidator, formConfig);

    // Pop-Up добавления карточки
    const popupWithAddForm = new PopupWithForm({
      popupSelector: popupAddCard,
      handleFormSubmit: (data) => {
        api.addCard(data)
          .then((cardData) => {
            const card = new Card(getCardData(cardData), '#card-template');
            cardList.addItem(card.generateCard());
          })
          .finally(() => {
            renderLoading();
            popupWithAddForm.close();
          });
      }
    }, formAddCardValidator, formConfig);

    // Дефолтные карточки
    const cardList = new Section({
        items: cardsArray,
        renderer: (cardData) => {
          const card = new Card(getCardData(cardData), '#card-template');
          cardList.setItem(card.generateCard());
        }
      }, cardsContainer);

    return [ userInfo, popupWithProfileForm, popupWithAvatar, popupWithAddForm, cardList ]
  })
  .then(([ userInfo, popupWithProfileForm, popupWithAvatar, popupWithAddForm, cardList ]) => {

    cardList.renderItems();

    // обработчики событий
    popupWithAddForm.setEventListeners();
    popupWithProfileForm.setEventListeners();
    popupWithImage.setEventListeners();
    popupWithConfirm.setEventListeners();
    popupWithAvatar.setEventListeners();

    // Обработчики кнопок
    editFormButton.addEventListener('click', () => {
      const thisUserInfo = userInfo.getUserInfo();
      inputProfileName.value = thisUserInfo.userName;
      inputProfileAbout.value = thisUserInfo.userAbout;
      popupWithProfileForm.open();
    });
    addFormButton.addEventListener('click', () => {
      popupWithAddForm.open();
    });
    avatarFormButton.addEventListener('click', () => {
      popupWithAvatar.open();
    })
  })
  .finally(() => {
    // Включить валидацию форм
    formProfileValidator.enableValidation();
    formAddCardValidator.enableValidation();
    formAvatarValidator.enableValidation();
  })
