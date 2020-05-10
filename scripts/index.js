/* Переменные для работы с карточками */
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.photo-grid');

/* Переменные для кнопок */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const likeButton = document.querySelector('.card__like-button');
const closeEditFormButton = document.querySelector('#edit-form_close-button');
const closeAddFormButton = document.querySelector('#add-form_close-button');

/* Переменные для элементов Pop-Up */
const popupElement = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('#edit-form');
const popupAdd = document.querySelector('#add-form');
const formElement = document.querySelector('.popup__container');
const inputProfileName = document.querySelector('.popup__input_type_user-name');
const inputProfileAbout = document.querySelector('.popup__input_type_user-about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');


function closePopup () {
  popupEdit.classList.remove('popup_open');
  popupAdd.classList.remove('popup_open');
}

function openProfilePopup () {
  popupEdit.classList.add('popup_open');
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}

function handleProfileSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileAbout.textContent = inputProfileAbout.value;
    closePopup ();
}

function openAddCardPopup () {
  popupAdd.classList.add('popup_open');
}

function renderCards() {
  cardsContainer.innerHTML = '';
  initialCards.forEach(renderCard);
  addEventListeners();
}

renderCards();

function renderCard(item, index) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__name').innerText = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card').setAttribute('id', index);
  cardsContainer.appendChild(cardElement);
}

function handleDelete(event) {
  const index = event.target.parentNode.getAttribute('id');
  initialCards.splice(index, 1);
  renderCards();
}

function addEventListeners() {
  document.querySelectorAll('.card__trash-button').forEach(deleteButton => {
    deleteButton.addEventListener('click', handleDelete);
  })
}

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddCardPopup);
formElement.addEventListener('submit', handleProfileSubmit);
closeEditFormButton.addEventListener('click', closePopup);
closeAddFormButton.addEventListener('click', closePopup);
