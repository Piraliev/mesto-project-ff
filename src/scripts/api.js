const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'a99e0a38-88bc-4c7b-aa71-5dc9dec36f0a',
    'Content-Type': 'application/json'
  }
}

//Запрос для получения данных пользователя
export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};


//Запрос получения списка карточек от сервера
export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//Отправка отредактированных данных о профиле
export const updateUserProfile = async (newName, newAbout) => {
  const response = await fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  })
  return response.json();
}; 

//Отправка новой карточки на сервер
export const uploadNewCard = async (cardName, cardLink) => {
  const response = await fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  return response.json();
};

//Обновление аватара
export const uploadNewAvatar = async (avatarLink) => {
  const response = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers, 
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  return response.json();
};

//Удаление карточки с сервера
export const deleteCardFromServer = ((cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
});

//Постановка лайка
export const putLike = ((cardId, likesCount) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => res.json())
    .then(res => likesCount.textContent = res.likes.length);
    
});

//Удаление лайка
export const takeOffLike = ((cardId, likesCount) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.json())
    .then(res => likesCount.textContent = res.likes.length);
});
