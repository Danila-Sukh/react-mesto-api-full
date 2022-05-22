function ImagePopup(props) {
  
  return (
    <div className={`popup popup_image-fullscreen ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container-image">
        <button className="popup__close popup__close-btn" type="button" aria-label="Закрыть окно"
                onClick={props.onClose}/>
        <img src={props.card ? props.card.link : "#"} alt={props.card ? props.card.name : ""} className="popup__image"/>
        <h3 className="popup__subtitle">{props.card ? props.card.name : ""}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;
