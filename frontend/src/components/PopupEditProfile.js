import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        btn="Сохранить"
        formName="edit"
        isOpen={props.isOpen && "popup_opened"}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
      <input
           type="text"
           id="input-name"
           className="popup__text popup__text_input-type_name"
           placeholder="Имя"
           minLength="2"
           maxLength="40"
           required autoFocus autoComplete="off"
           name="name"
           value={name || ''}
           onChange={handleNameChange}/>
      <span className="input-name-error popup__span-error"/>
      <input
          type="text"
          id="input-job"
          className="popup__text popup__text_input-type_job"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
          name="job"
          value={description || ''}
          onChange={handleDescriptionChange} />
      <span className="input-job-error popup__span-error"/>
    </PopupWithForm>
  )
}

export default PopupEditProfile
