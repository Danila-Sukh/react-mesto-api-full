import React from "react";
import EditAvatar from "../images/profile_photo_edit.svg";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      
      <section className="profile">
        <div className="profile__popup" onClick={props.onEditAvatar}>
          <img src={EditAvatar} alt="Редактировать профиль"/>
        </div>
        <img src={currentUser.avatar} alt="Фото профиля" className="profile__image"/>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button className="profile__button-edit" aria-label="Редактировать профиль" type="button"
                  onClick={props.onEditProfile}/>
        </div>
        <button className="profile__button-add" aria-label="Добавить профиль" type="button"
                onClick={props.onAddPlace}/>
      </section>

      <section className="elements">
        {props.cards.map((item, index) => {
          return (
            <Card
              card={item}
              cardIndex={index}
              key={item._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
        })}
      </section>

    </main>
  )
}

export default Main;
