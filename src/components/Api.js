import { renderLoading } from "../utils/utils.js";

export default class Api {
  constructor({ baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _handleResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

  addCard({ name, link, alt }) {
    renderLoading(true);
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
        alt
      })
    })
      .then(this._handleResponse)
  }

  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._handleResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

  setUserInfo({ name, about }) {
    renderLoading(true);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResponse)
  }

  setUserAvatar({ avatar }) {
    renderLoading(true);

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._handleResponse)
  }

  putLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._handleResponse)
  }

  removeLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._handleResponse)
  }
}
