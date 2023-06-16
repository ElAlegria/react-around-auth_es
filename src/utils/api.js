class Api {
  constructor({ address, headers }) {
    this._baseUrl = address;
    this._headers = headers;
  }
  _handleResponse(res) {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }

  _makeRequest(method, url, body) {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  //getCardList hara una petición para obtener las tarjetas iniciales
  getCardList() {
    return this._makeRequest("GET", `${this._baseUrl}/cards`);
  }

  //getUserInfo hara una petición para obtener los datos del usuario actual
  getUserInfo() {
    return this._makeRequest("GET", `${this._baseUrl}/users/me`);
  }

  //setUserInfo hara una petición PATCH al endpoint para actualizar los datos del usuario actual con el nombre y descripción especificados.
  setUserInfo({ name, about }) {
    return this._makeRequest("PATCH", `${this._baseUrl}/users/me`, {
      name,
      about,
    });
  }
  //addCard hara una petición POST al endpoint para crear una nueva tarjeta con el nombre y link especificados.
  // addCard({ name, link }) {
  //   return this._makeRequest("POST", `${this._baseUrl}/cards`, { name, link });
  // }
  handleAddCard(value) {
    return fetch("https://around.nomoreparties.co/v1/web_es_cohort_04/cards", {
      method: "POST",
      headers: {
        authorization: "7b89216e-03f6-4244-8235-930eb464c231",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${value.newPlaceTitle}`,
        link: `${value.newPlaceLink}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  //removeCard hara una petición DELETE al endpoint para eliminar la tarjeta con el id especificado.
  removeCard(cardId) {
    return this._makeRequest("DELETE", `${this._baseUrl}/cards/${cardId}`);
  }

  //setUserAvatar hara una petición PATCH al endpoint para actualizar el avatar del usuario actual con el link especificado.
  //? api avatar Provicional
  handleChangeAvatar(value) {
    return fetch(
      "https://around.nomoreparties.co/v1/web_es_cohort_04/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "7b89216e-03f6-4244-8235-930eb464c231",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: `${value.avatar}`,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //addLike hara una petición PUT al endpoint para agregar un like a la tarjeta con el id especificado.
  addLike(cardId) {
    return this._makeRequest("PUT", `${this._baseUrl}/cards/likes/${cardId}`);
  }
  //removeLike hara una petición DELETE al endpoint para eliminar el like a la tarjeta con el id especificado.
  removeLike(cardId) {
    return this._makeRequest(
      "DELETE",
      `${this._baseUrl}/cards/likes/${cardId}`
    );
  }
}

const  api =  new Api ({
  address: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  headers: {
    authorization: "7b89216e-03f6-4244-8235-930eb464c231",
    "Content-Type": "application/json",
  },
});

export default api
