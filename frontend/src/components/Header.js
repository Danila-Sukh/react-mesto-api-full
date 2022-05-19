import logo from "../images/logo.svg"
import React from 'react';
import {Link, Route, Switch,BrowserRouter} from "react-router-dom";

function Header (props) {
    return (
    <header className="header">
      <a href="#root">
        <img
          src={logo}
          alt="Логотип"
          className="header__logo"
        />
      </a>

      <div className="header__actions">
      
                <Switch>
                    <Route path="/sign-up">
                        <Link to="/sign-in" className="header__link">Вход</Link>
                    </Route>

                    <Route path="/sign-in">
                        <Link to="/sign-up" className="header__link">Регистрация</Link>
                    </Route>

                    <Route path="/">
                        <p className="header__email">{props.email}</p>
                        <Link to="/sign-in" onClick={props.onSignOut} className="header__link header__link_type_auth">Выйти</Link>
                    </Route>
                </Switch>
                
            </div>
    </header>
    )
}

export default Header;