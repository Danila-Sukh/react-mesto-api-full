import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_big-size-image ${
        props.isOpened ? "popup_opened" : ""
      }`} onClick={props.onPopupClick}>
    <div className="popup__content-big-image">
      <img className="popup__big-img" src={props.card.link} alt={props.card.name}/>
      <h2 className="popup__name-big-img">{props.card.name}</h2>
      <button className="popup__close popup__close_type_big-image" type="button" onClick={props.onClose}></button>
    </div>
   </div>
  );
}

export default ImagePopup;


