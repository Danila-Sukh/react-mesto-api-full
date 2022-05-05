class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _handleFetch(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));

  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }

  addNewCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._handleFetch(res))
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.removeLike(id);
    }
  }

  removeLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }

  addLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }


  deleteCard(elementId) {
    return fetch(`${this.url}/cards/${elementId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }

  setUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._handleFetch(res));
  }

  updateAvatar(link) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._handleFetch(res));
  }
}


const api = new Api({
  baseUrl: 'https://dsukh.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
})

export {api};
