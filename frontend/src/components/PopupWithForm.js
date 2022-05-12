import React from 'react';

const PopupWithForm = (props) => {

    return (
        <div className={`popup ${props.name} ${props.isOpened ? 'popup_opened' : ''}`} onClick={props.onPopupClick}>
        <div className="popup__content" onClick={e => e.stopPropagation()}>
          <h2 className="popup__title">{props.title}</h2>
          
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__button" > {props.buttonText} </button>
          </form>
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          />
        </div>
    </div>
    )
}

export default PopupWithForm;