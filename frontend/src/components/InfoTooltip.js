export default function InfoTooltip({ isOpen, onClose, title, imgPath }) {

    function handleClickOverlay(e) {
        e.stopPropagation();
      }

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__container" onClick={handleClickOverlay}>
        <img src={imgPath} alt={imgPath} className="popup__tooltip" />
        <h2 className="popup__title popup__title_type_tooltip">{title}</h2>
      <button
          type="button"
          className="button popup__close-button"
          aria-label="Закрыть картинку"
          onClick={onClose}
        ></button>
    </div>
    </div>
  );
}
