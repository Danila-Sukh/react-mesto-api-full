import AuthPage from "./AuthPage";
import React, { useState } from "react";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    evt.target.name === "Email" ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="register">
      <AuthPage
        formName="register"
        onSubmit={handleSubmit}
        title="Регистрация"
        buttonText="Зарегистрироваться"
      >
        <input
          name="Email"
          type="email"
          className="popup__input_type_login"
          id="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleChange}
        />

        <input
          name="Password"
          type="password"
          className="popup__input_type_login"
          id="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChange}
        />
      </AuthPage>
    </div>
  );
}
