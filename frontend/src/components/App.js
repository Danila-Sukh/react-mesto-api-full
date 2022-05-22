import React from "react";
import { Route, Switch, useHistory, BrowserRouter } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";

import imageGood from "../images/good.png";
import imageBad from "../images/bad.png";
import { apiAuth } from "../utils/AuthApi";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] =
    React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    React.useState(false);
  const [isAddCardPopupOpened, setIsAddCardPopupOpened] = React.useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [userEmail, setIsUserEmail] = React.useState("");
  const history = useHistory();
  const [infoTooltipImg, setIsInfoTooltipImg] = React.useState(imageGood);
  const [infoTooltipText, setIsInfoTooltipText] = React.useState(
    "Вы успешно зарегистрировались!"
  );
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }
  function handleAddCardClick() {
    setIsAddCardPopupOpened(true);
  }

  function handlePopupBigImageClick(name, link) {
    setIsImagePopupOpened(true);
    setSelectedCard({ name, link });
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpened(true);
    setIsInfoTooltipImg(imageGood);
    setIsInfoTooltipText("Вы успешно зарегистрировались!");
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddCardPopupOpened(false);
    setIsImagePopupOpened(false);
    setIsInfoTooltipOpened(false);
  }
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(data) {
    api
      .addPlaceCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    if (
      isEditAvatarPopupOpened ||
      isEditProfilePopupOpened ||
      isAddCardPopupOpened ||
      isImagePopupOpened
    ) {
      function handleEsc(event) {
        if (event.key === "Escape") {
          closeAllPopups();
        }
      }

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [
    isEditAvatarPopupOpened,
    isEditProfilePopupOpened,
    isAddCardPopupOpened,
    isImagePopupOpened,
  ]);

  function handlePopupOutsideClose(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .updateCardLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deletePlaceCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }
  function onCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  }

  function handleRegister({ email, password }) {
    apiAuth
      .register({ email, password })
      .then((res) => {
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipOpen();
        setIsInfoTooltipImg(imageBad);
        setIsInfoTooltipText("Что-то пошло не так!\n" + "Попробуйте ещё раз.");
      });
  }

  function handleLogin({ email, password }) {
    apiAuth
      .authorization({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        allDataGet(res.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (loggedIn === true) {
      history.push("/");
    }
  }, [loggedIn]);
  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth
        .getContent(jwt)
        .then((data) => {
          if (data) {
            allDataGet(jwt);
            setIsUserEmail(data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function allDataGet(jwt) {
    api
      .getAppInfo(jwt)
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header loggedIn={loggedIn} email={userEmail} onSignOut={signOut} />

        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddCardClick={handleAddCardClick}
            handlePopupBigImageClick={handlePopupBigImageClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            onCardClick={onCardClick}
            cards={cards}
          />
        </Switch>

        <EditProfilePopup
          isOpened={isEditProfilePopupOpened}
          onPopupClick={handlePopupOutsideClose}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <InfoTooltip
          isOpened={isInfoTooltipOpened}
          onClose={closeAllPopups}
          popupText={infoTooltipText}
          popupImg={infoTooltipImg}
          name="infoTooltip"
        />

        <AddPlacePopup
          isOpened={isAddCardPopupOpened}
          onPopupClick={handlePopupOutsideClose}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpened}
          onPopupClick={handlePopupOutsideClose}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          isOpened={isImagePopupOpened}
          onPopupClick={handlePopupOutsideClose}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
