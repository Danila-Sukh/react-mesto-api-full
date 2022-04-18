import React from "react";
import {auth} from '../utils/auth'
import { withRouter } from 'react-router-dom';

function Register(props) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setUserName("");
    setPassword("");
  }, []);

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegisterSubmit(password, userName);
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
          <form className="login__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="login__input"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              required
              autoFocus
              autoComplete="off"
              name="name"
              value={userName || ""}
              onChange={handleUserNameChange}
            />
            <input
              type="password"
              className="login__input"
              placeholder="Password"
              minLength="2"
              maxLength="200"
              required
              autoComplete="off"
              name="password"
              value={password || ""}
              onChange={handlePasswordChange}
            />
          <button
            className="login__button"
            type="submit"
            aria-label="Зарегистрироваться">
            Зарегистрироваться
          </button>
        </form>
    </div>
  );
}

export default withRouter(Register);
