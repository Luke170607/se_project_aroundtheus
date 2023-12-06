import { data } from "autoprefixer";

export class Api {
  constructor({baseUrl, headers}) {
    // constructor body
    this._baseUrl = baseUrl
    this._headers = headers;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }
  //load cards from server
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }
  // refactor duplicate code i.e authorization and fetch
  getCardsById(id) {
    return fetch(`${this._baseUrl}/cards/${id}`);
  }
  //load user info from server
  loadInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }
  //editing profile
  updateInfo(modalInputs) {
    const { title, description } = modalInputs;
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
  //Post new card to Api
  postCards(modalInputs) {
    const { place, Url } = modalInputs;
    //let id;
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
    /// grab id from card-send id to this api call-delete card from html
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      this._handleResponse(res);
    });
  }
  notLiked(id) {
    /// grab id from card-send id to this api toggle like
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      this._handleResponse(res);
    });
  }
  toLike(id) {
    /// grab id from card-send id to this api call toggle like
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      this._handleResponse(res);
    });
  }
}
