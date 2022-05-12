class Api {
  constructor({ url }) {
    this._url = url;
  }

  getAppInfo(token) {
    this._token = token;

    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
  editUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }
  editAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link.avatar }),
    }).then(this._checkResponse);
  }
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
  addPlaceCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }
  deletePlaceCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  updateCardLike(id, liked) {
    return this._set(`cards/${id}/likes`, liked ? "PUT" : "DELETE");
  }

  _set(query, method) {
    return fetch(`${this._url}${query}`, {
      method,
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: "https://dsukh.nomoredomains.work/"
});

export default api;
