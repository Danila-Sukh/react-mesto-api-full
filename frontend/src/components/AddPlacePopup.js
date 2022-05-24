import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
    >
      <input
        type="text"
        name="cardTitle"
        className="popup__input popup__input_type_card-title"
        id="title-input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
        value={name || ""}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        type="url"
        name="cardLink"
        className="popup__input popup__input_type_card-link"
        id="link-input"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link || ""}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}
