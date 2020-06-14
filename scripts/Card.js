import {openPopup, popupExpandedImage} from './utils.js';

export default class Card {
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

  // Развернуть картинку
  _popupExpandedImage() {
    this._popupImage = document.querySelector('.popup__image');
    this._cardImage = this._element.querySelector('.card__image');
    this._popupImage.src = this._cardImage.src;
    this._popupImage.alt = this._cardImage.alt;
    document.querySelector('.popup__figcaption').textContent = this._cardImage.alt;
    openPopup(popupExpandedImage);
  }

  // Переключатель лайков
  _toggleLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  // Удалить карточку, снять обработчики событий
  _handleDelete() {
    this._trashButton = this._element.querySelector('.card__trash-button');
    this._trashButton.closest('.card').remove();
    this._trashButton.removeEventListener('click', () => {
      this._handleDelete();
    });
    this._element.querySelector('.card__like-button').removeEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.card__image').removeEventListener('click', () => {
      this._popupExpandedImage();
    });
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._popupExpandedImage();
    });
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._handleDelete();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    return this._element;
  }
}
