import logo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header(props) {
  
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="logo header__logo" />
      <NavBar
        loggedIn={props.loggedIn}
        email={props.email}
        loggedOut={props.loggedOut}
      />
    </header>
  )
}

export default Header;
