import {openPopup, popupImage} from './index.js';

export class Card {
  // static cardTemplate = document.querySelector('#card-template').content;
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._alt;
    return this._element;
  }

  // Развернуть картинку
  _expandImage() {
    document.querySelector('.popup__image').src = this._element.querySelector('.card__image').src;
    document.querySelector('.popup__image').alt = this._element.querySelector('.card__image').alt;
    document.querySelector('.popup__figcaption').textContent = this._element.querySelector('.card__image').alt;
    openPopup(popupImage);
  }

  // Переключатель лайков
  _toggleLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  // Удалить карточку, снять обработчики событий
  _handleDelete() {
    this._element.querySelector('.card__trash-button').closest('.card').remove();
    this._element.querySelector('.card__trash-button').removeEventListener('click', () => {
      this._handleDelete();
    });
    this._element.querySelector('.card__like-button').removeEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.card__image').removeEventListener('click', () => {
      this._expandImage();
    });
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._expandImage();
    });
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._handleDelete();
    });
  }
}
