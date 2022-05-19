import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <button type="button" aria-label="Удалить карточку" className={cardDeleteButtonClassName}
              onClick={handleDeleteClick}/>
      <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleCardClick}/>
      <div className="element__text">
        <h2 className="element__title">{props.card.name}</h2>
        <button className={cardLikeButtonClassName} aria-label="Поставить лайк" type="button"
                onClick={handleLikeClick}/>
        <p className="element__counter">{props.card.likes.length}</p>
      </div>
    </article>
  )
}

export default Card;
