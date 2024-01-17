import { data } from "autoprefixer";

export class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getCardsById(id) {
    return fetch(`${this._baseUrl}/cards/${id}`);
  }
  loadInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  updateInfo(modalInputs) {
    const { title, description } = modalInputs;
    console.log(modalInputs);
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then((res) => {
      this._handleResponse(res);
    });
  }
  updateAvatar(modalInputs) {
    const { Url } = modalInputs;
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: Url,
      }),
    }).then((res) => {
      this._handleResponse(res);
    });
  }

  postCards(modalInputs) {
    const { place, Url } = modalInputs;

    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: Url,
      }),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }
  deleteCards(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      this._handleResponse(res);
    });
  }
  notLiked(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      this._handleResponse(res);
    });
  }
  toLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      this._handleResponse(res);
    });
  }
}
