import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popupSelector.removeEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // Очистить ошибки полей ввода
  _resetErrors() {
    const errors = this._popupSelector.querySelectorAll('.popup__input-error');
    errors.forEach(error => error.classList.remove('popup__input-error_active'));
  }

  // Сброс состояния кнопки сабмита
  _resetButton() {
    this._popupSelector.querySelector('.popup__submit-button').classList.add('popup__submit-button_inactive');
    this._popupSelector.querySelector('.popup__submit-button').disabled = true;
  }

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__container').reset();
    this._resetButton();
    this._resetErrors();
  }
}
