import Popup from './Popup.js';
import { formConfig } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, className) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._className = className;
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

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__container').reset();
    this._className.resetErrors(formConfig);
    this._className.resetButton(formConfig);
  }
}