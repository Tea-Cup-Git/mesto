export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('mousedown', (event) => {
      this._handleOverlayClose(event);
    });
    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
  }

  removeEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').removeEventListener('click', () => {
      this.close();
    });
    document.removeEventListener('mousedown', (event) => {
      this._handleOverlayClose(event);
    });
    document.removeEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
  }

  open() {
    this._popupSelector.classList.add('popup_open');
  }

  close() {
    this.removeEventListeners();
    this._popupSelector.classList.remove('popup_open');
  }
}
