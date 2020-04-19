let editButton = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__submit-button');
let formElement = document.querySelector('.popup__container');

function openPopup () {
  popupElement.classList.add('popup_open');
}
function closePopup () {
  popupElement.classList.remove('popup_open');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = document.querySelector('.popup__input_name');
    let aboutInput = document.querySelector('.popup__input_about');

    nameInput = nameInput.value;
    aboutInput = aboutInput.value;

    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');

    profileName.textContent = nameInput;
    profileAbout.textContent = aboutInput;
}

formElement.addEventListener('submit', formSubmitHandler);

submitButton.addEventListener('click', closePopup);
