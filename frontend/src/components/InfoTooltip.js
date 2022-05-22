import React from "react";

import successSignUpImg from "../images/sucess-sign-up.svg";
import notSuccessSignUpImg from "../images/not-sucess-sign-up.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen  && "popup_opened"}`}>
      <div className="popup__main-container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        />
        <div className="popup__container popup__login">
        <img
          className="popup__icon"
          src={props.isSuccess ? successSignUpImg : notSuccessSignUpImg}
          alt={
            props.isSuccess
              ? "иконка успешной регистрации"
              : "иконка не успешной регистрации"
          }
        />
        <h3 className="popup__title popup__title_login">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Пропробуйте ещё раз."}
        </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
