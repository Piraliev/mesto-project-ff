// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;

// @todo: DOM узлы

const cardPlace = document.querySelector('.places__list');


// @todo: Функция создания карточки

function cardCreate(element) {
  const cardTitle = element.name;
  const cardLink = element.link;
  const cardTemplateClone = cardTemplateContent.cloneNode(true);
  cardTemplateClone.querySelector('.card__title').textContent = cardTitle;
  cardTemplateClone.querySelector('.card__image').setAttribute('src', cardLink);
  const cardItem = cardTemplateClone.querySelector('.places__item');
  const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => cardDelete(cardItem));
  return cardTemplateClone;
}

// @todo: Функция удаления карточки

function cardDelete(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  cardPlace.append(cardCreate(card));
})