/* Переменные для работы с карточками */
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

/* Переменные для кнопок */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditFormButton = document.querySelector('#edit-form_close-button');
const closeAddFormButton = document.querySelector('#add-form_close-button');
const closeImageButton = document.querySelector('#image-expander_close-button');

/* Переменные для элементов Pop-Up */
const popupProfileEdit = document.querySelector('#edit-form');
const popupAddCard = document.querySelector('#add-form');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formProfile = document.querySelector('#edit-form_container');
const formAddCard = document.querySelector('#add-form_container');
const inputProfileName = document.querySelector('.popup__input_type_user-name');
const inputProfileAbout = document.querySelector('.popup__input_type_user-about');
const inputCardName = document.querySelector('.popup__input_type_place-name');
const inputCardImage = document.querySelector('.popup__input_type_image-link');

/* Функция: закрыть всплывающее окно */
function closePopup() {
  popupProfileEdit.classList.remove('popup_open');
  popupAddCard.classList.remove('popup_open');
  popupImage.classList.remove('popup_open');
}

/* Функция: открыть окно редактирования профиля */
function openProfilePopup() {
  popupProfileEdit.classList.add('popup_open');
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}

/* Функция: сохранить данные профиля */
function handleProfileSubmit() {
    profileName.textContent = inputProfileName.value;
    profileAbout.textContent = inputProfileAbout.value;
    closePopup();
}

/* Функция: открыть окно создания карточки */
function openAddCardPopup () {
  popupAddCard.classList.add('popup_open');
}

/* Функция: отобразить дефолтные карточки */
function renderCards() {
  cardsContainer.innerHTML = '';
  initialCards.forEach(renderCard);
}

renderCards();

/* Функция: добавить карточку */
function renderCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__name').textContent = item.name;
  cardElement.querySelector('.card__image').alt = item.alt;
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__like-button').addEventListener('click', handleLikeToggler);
  cardElement.querySelector('.card__trash-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__image').addEventListener('click', openImagePopup);
  cardsContainer.appendChild(cardElement);
}

const popupImage = document.querySelector('#image-expander');
const popupFigcaption = document.querySelector('.popup__figcaption');

function openImagePopup(event) {
  popupImage.classList.add('popup_open');
  document.querySelector('.popup__image').src = event.target.src;
  document.querySelector('.popup__image').alt = event.target.alt;
  popupFigcaption.textContent = event.target.alt;
}

function handleAddCardSubmit(event) {
  event.preventDefault();
  let userCard = {
    name: inputCardName.value,
    link: inputCardImage.value,
    alt: inputCardName.value
  };
  initialCards.unshift(userCard);
  inputCardName.value = '';
  inputCardImage.value ='';
  renderCards();
  closePopup();
}

/* Функция: переключатель лайков */
function handleLikeToggler(event) {
  event.target.classList.toggle('card__like-button_active');
}

/* Функция: удалить карточку */
function handleDelete(event) {
  const cardElement = event.target.closest('.card');
  cardElement.querySelector('.card__like-button').removeEventListener('click', handleLikeToggler);
  cardElement.querySelector('.card__trash-button').removeEventListener('click', handleDelete);
  cardElement.querySelector('.card__image').removeEventListener('click', openImagePopup);
  cardElement.remove();
}

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddCardPopup);
formProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
closeEditFormButton.addEventListener('click', closePopup);
closeAddFormButton.addEventListener('click', closePopup);
closeImageButton.addEventListener('click', closePopup);
