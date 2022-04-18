import React from "react";
import {NavLink} from 'react-router-dom';

function NavBar(props) {
    const [route, setRoute] = React.useState('sing-in');

    function handleRouteChange() {
        route === 'sing-in' ? setRoute('sing-up') : setRoute('sing-in')
    }

    if (props.loggedIn) {
        return (<nav className="menu">
            <NavLink
                className="menu__item"
                activeClassName="menu__item_active"
                to=""
            >{props.email}</NavLink>
            <NavLink
            className="menu__item"
            activeClassName="menu__item_active"
            to="/sign-in"
            onClick={props.loggedOut}
            >Выход</NavLink>
        </nav>)
    } else {
        return (<nav className="menu">
            {route === 'sing-up' &&
            (<NavLink
                exact
                className="menu__item"
                activeClassName="menu__item_active"
                to="/sign-in"
                onClick={handleRouteChange}
            >Вход</NavLink>)}
            {route === 'sing-in' &&
            (<NavLink
                className="menu__item"
                activeClassName="menu__item_active"
                to="/sign-up"
                onClick={handleRouteChange}
            >Регистрация</NavLink>)
            }
        </nav>)
    }
}

    export default NavBar;