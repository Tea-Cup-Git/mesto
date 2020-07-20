import { renderLoading } from "../utils/utils.js";

export default class Api {
  constructor({ baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
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
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
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
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
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
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
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
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  putLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
