import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(event) {
    this._popupImage = document.querySelector('.popup__image');
    this._popupImage.src = event.target.src;
    this._popupImage.alt = event.target.alt;
    document.querySelector('.popup__figcaption').textContent = event.target.alt;
    super.open();
  }
}
