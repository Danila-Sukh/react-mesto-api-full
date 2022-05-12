import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {
   
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((item) => item._id === currentUser._id)
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? '' : 'element__delete_hidden'}`
  );
  const cardLikeButtonClassName = (
    `element__heart ${isLiked ? 'element__heart_fill' : ''}`
  );

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
        ></button>
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="element__social">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__likes-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
