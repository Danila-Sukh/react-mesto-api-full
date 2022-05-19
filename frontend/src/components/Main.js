import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditInfo,
  onAddPlace,
  onCardClick,
  onConfirmDelete,
  handleCardLike,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile page__profile">
        {/* ПОПАП АВАТАРА */}
        <div className="profile__avatar-container">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="button profile__edit-button"
            type="button"
            onClick={onEditInfo}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          aria-label="Добавить еще одно место"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places page__places">
        <ul className="places__list">
        {
          cards.map((card) => (<Card key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onConfirmDelete={onConfirmDelete}
            />))
          }
        </ul>
      </section>
    </main>
  );
}
