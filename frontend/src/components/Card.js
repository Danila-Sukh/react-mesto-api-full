import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardClick,
  onConfirmDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `place__remove-button ${
    isOwn ? "" : "place__remove-button_type_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((id) => id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place__like-button ${
    isLiked ? "place__like-button_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onConfirmDelete(card);
  }

  return (
    <li className="place">
      <img
        className="place__photo popup__open-button"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="place__description">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
