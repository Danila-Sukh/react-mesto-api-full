export default function ImagePopup({ card, onClose, isOpen }) {

  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  return (
    <div className={`popup popup_open-image ${isOpen && "popup_opened"}`} onClick={onClose}>
      <figure className="popup__figure" onClick={handleClickOverlay}>
        <img 
        src={card ? card.link : '#'} 
        className="popup__image" 
        alt={card ? card.name : '#'} />
        <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
        <button
          type="button"
          className="button popup__close-button"
          aria-label="Закрыть картинку"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}
