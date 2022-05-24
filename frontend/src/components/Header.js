import React from 'react';
import mesto_logo from "../images/mesto_logo.svg";

import { NavLink, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {

  const location = useLocation();
  const [navBarIsOpen, setNavBarIsOpen] = React.useState(false);


  function handleToggleMenu() {
    setNavBarIsOpen(!navBarIsOpen);
  }

  function handleSignOut() {
    setNavBarIsOpen(false);
    onSignOut();
  }

  return (
    <header className={loggedIn ? 'header header_column-reverse' : 'header'}>
      {loggedIn &&
        (
          <div
            className={navBarIsOpen ? 'header__container header__container_opened' : 'header__container'}
          >
            <address
              className="header__email"
            >
              {email && email}
            </address>
            <button
              className="header__logout"
              type="button"
              onClick={handleSignOut}
            >
              Выйти
            </button>
          </div>
        )
      }
      <div
        className="header__main-container"
      >
        <img className="header__logo" src={mesto_logo} alt="логотип Место" />
        {loggedIn &&
          (
            <button
              className={navBarIsOpen ? 'header__nav-bar-button header__nav-bar-button_opened' : 'header__nav-bar-button'}
              type="button"
              aria-label="меню"
              onClick={handleToggleMenu}
            />
          )
        }
        {!loggedIn &&
          (<nav>
            {location.pathname === '/sign-in' &&
              (
                <NavLink
                  className="header__auth-link"
                  to="/sign-up"
                >
                  Войти
                </NavLink>
              )
            }
            {location.pathname === '/sign-up' &&
              (
                <NavLink
                  className="header__auth-link"
                  to="/sign-in"
                >
                  Регистрация
                </NavLink>
              )
            }
          </nav>
        )
        }
      </div>

    </header>
  )
}

export default Header;
