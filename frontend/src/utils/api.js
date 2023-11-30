class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  // Обработчик HTTP-ответов, проверяет статус ответа и преобразует в JSON
  _handleHttpResponse(res) {
    // Проверка ответа
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Приватный универсальный метод для отправки запросов с проверкой ответа
  _request(url, method, body) {
    const token = localStorage.getItem("token");
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    return fetch(`${this._url}${url}`, config).then(this._handleHttpResponse);
  }

  // Метод для получения информации о пользователе и изначальных карточек с сервера
  getAllInfo() {
    return Promise.all([this.getsUserInfo(), this.getsInitialCards()]);
  }

  // Загрузить данные о пользователе с сервера
  getsUserInfo() {
    return this._request("/users/me", "GET");
  }

  // Загрузить изначальные карточки с сервера добавленные пользователем
  getsInitialCards() {
    return this._request("/cards", "GET");
  }

  // Сохранение редактируемых данных на сервер
  updateUserInfo(data) {
    return this._request("/users/me", "PATCH", {
      name: data.name,
      about: data.about,
    });
  }

  // Добавить новую карточку на сервер
  addNewCard(data) {
    return this._request("/cards", "POST", {
      name: data.name,
      link: data.link,
    });
  }

  // Удалить карточку с сервера
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, "DELETE");
  }

  // Поставить лайк карточке и убрать его
  likeCard(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, isLiked ? "DELETE" : "PUT");
  }

  // Обновление аватара
  updateAvatar(data) {
    return this._request("/users/me/avatar", "PATCH", {
      avatar: data.avatar,
    });
  }
}

const api = new Api({
  // url: "https://api.mestomagnifico.nomoredomainsmonster.ru",
  url: "http://localhost:3000",
});

export default api;
