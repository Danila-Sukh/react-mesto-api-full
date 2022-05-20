import PopupWithForm from "./PopupWithForm";

function PopupSubmitDelete(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmitDelete(props.card);
  }

  return (
    <PopupWithForm
         name="accept-delete"
         title="Вы уверены?"
         btn="Да"
         formName="delete"
         isOpen={props.isOpen && "popup_opened"}
         onClose={props.onClose}
         onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}

export default PopupSubmitDelete;
