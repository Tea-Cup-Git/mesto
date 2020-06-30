import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, imageSelector}) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector(imageSelector);
  }

  open({link, alt}) {
    this._popupImage.src = link;
    this._popupImage.alt = alt;
    document.querySelector('.popup__figcaption').textContent = alt;
    super.open();
  }
}
