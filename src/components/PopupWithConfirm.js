import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  setSubmit(submit) {
    this._handleSubmit = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    })
  }
}
