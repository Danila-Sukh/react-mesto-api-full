import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onConfirmDelete(props.card)
    }

    return (
        <PopupWithForm
        title="Вы уверены?"
        name="confirm-delete"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        isLoading={props.isLoading}
        buttonText="Да"
        loadingButtonText="Удаление..."
        />
    );
}