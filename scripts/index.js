const editButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_name');
const aboutInput = document.querySelector('.popup__input_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function openPopup () {
  popupElement.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup () {
  popupElement.classList.remove('popup_open');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);

