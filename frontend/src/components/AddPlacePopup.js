import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({name, link})
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      btn='Создать'
      formName='form-add'
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
           type="text"
           id="input-title"
           className="popup__text popup__text_input-type_title"
           placeholder="Название"
           autoFocus minLength="2"
           maxLength="30"
           required autoComplete="off"
           name="title"
           value={name || ''}
           onChange={handleNameChange}/>
        <span className="input-title-error popup__span-error"/>
        <input
            type="url"
            id="input-link"
            className="popup__text popup__text_input-type_link"
            placeholder="Ссылка на картинку"
            required autoComplete="off"
            name="link"
            value={link || ''}
            onChange={handleLinkChange}/>
          <span className="input-link-error popup__span-error"/>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
