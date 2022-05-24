export const BASE_URL = "https://api.dsukh.nomoredomains.work"

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  export const logout = () => {
    return fetch(`${BASE_URL}/logout`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
    })
    .then(checkResponse)
  }

  export const login =  (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
    })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        document.cookie.setItem('jwt', data.token)
        return data.token
      }
      console.log(data.token)
    })
  }
  export const getContent = token => {
    
    return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(checkResponse)
}