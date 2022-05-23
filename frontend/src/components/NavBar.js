import React from "react";
import { NavLink, Route } from 'react-router-dom';

function NavBar(props) {


    if (props.loggedIn) {
        return (<nav className="menu">
            <NavLink
                className="menu__item"
                activeClassName="menu__item_active"
                to=""
            >{props.email}</NavLink>
            <Route path="">
            <NavLink
                className="menu__item"
                activeClassName="menu__item_active"
                to="/sign-in"
                onClick={props.loggedOut}
            >Выход</NavLink>
            </Route>
        </nav>)
    } else {
        return (<nav className="menu">
            <Route path="/sign-up">
                <NavLink
                    exact
                    className="menu__item"
                    activeClassName="menu__item_active"
                    to="/sign-in"
                >Вход</NavLink>
            </Route>
            <Route path="/sign-in">
                <NavLink
                    className="menu__item"
                    activeClassName="menu__item_active"
                    to="/sign-up"
                >Регистрация</NavLink>
            </Route>
        </nav>)
    }
}

export default NavBar;