import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
  
    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, props.isOpened]);
  
    function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateUser({
        name: name,
        about: description,
      });
    }
  
    function handleName(e) {
      setName(e.target.value)
    }
  
    function handleDescription(e) {
      setDescription(e.target.value)
    }
  
    return (
<PopupWithForm
        isOpened={props.isOpened}
        onPopupClick={props.onPopupClick}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        name="edit-profile"
        buttonText="Сохранить"
        title="Редактировать профиль"
      >

        <input
          className="popup__field popup__field_type_name"
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          required
          id="user-name"
          placeholder="Имя"
          value={name || ''}
          onChange={handleName}
        />
        <span id="user-name-error" className="error"></span>
        <input
          className="popup__field popup__field_type_jobs"
          type="text"
          name="about"
          minLength="2"
          maxLength="200"
          required
          id="about"
          placeholder="Работа"
          value={description || ''}
          onChange={handleDescription}
        />
        <span id="about-error" className="error"></span>
      </PopupWithForm>
    )
  }
  
  export default EditProfilePopup;