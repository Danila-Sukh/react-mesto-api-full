import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
  
    const nameCard = React.useRef();
    const linkCard = React.useRef();



  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
       name: nameCard.current.value,
       link: linkCard.current.value,
    })
  }

  return (
    <PopupWithForm
    isOpened={props.isOpened}
    onPopupClick={props.onPopupClick}
    onClose={props.onClose}
    onSubmit={handleSubmit}
        name="add-card"
        buttonText="Сохранить"
        title="Новое место"
      >
        <input
                className="popup__field popup__field_type_card-name"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                id="name-card"
                ref={nameCard}
              />
              <span id="name-card-error" className="error">Вы пропустили это поле.</span>
              <input
                className="popup__field popup__field_type_card-link"
                type="text"
                name="link"
                placeholder="Ссылка на картинку"
                minLength="2"
                required
                id="link"
                ref={linkCard}
              />
              <span id="link-error" className="error">Введите адрес сайта.</span>
      </PopupWithForm>
  )
}

export default AddPlacePopup;