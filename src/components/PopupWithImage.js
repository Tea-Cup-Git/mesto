import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, imageSelector, textSelector}) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector(imageSelector);
    this._textSelector = textSelector;
  }

  open({link, alt}) {
    this._popupImage.src = link;
    this._popupImage.alt = alt;
    this._textSelector.textContent = alt;
    super.open();
  }
}
