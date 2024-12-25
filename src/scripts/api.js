const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'a99e0a38-88bc-4c7b-aa71-5dc9dec36f0a',
    'Content-Type': 'application/json'
  }
}

//Функция преобразования ответа от сервера
export function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}

//Функция обработки ошибки от сервера
export function handleResponseError(err) {
  console.log(`Запрос вернул: ${err}`);
  return alert(`При запросе к серверу произошла ${err}, проверьте параметры запроса`);
}

//Запрос для получения данных пользователя
export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));  
}

//Запрос получения списка карточек от сервера
export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

//Отправка отредактированных данных о профиле
export const updateUserProfile = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  })
  .then(res => getResponseData(res))
  .catch(err => err.json())
  .catch(err => console.log(err))
}

//Отправка новой карточки на сервер
export const uploadNewCard = (cardName, cardLink) => {
 return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => getResponseData(res));
}

//Обновление аватара
export const uploadNewAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers, 
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => getResponseData(res));
}

//Удаление карточки с сервера
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

//Запрос лайков карточки
export const getLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => getResponseData(res));
};

//Постановка лайка
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => getResponseData(res));
};

//Удаление лайка
export const takeOffLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res));
}
