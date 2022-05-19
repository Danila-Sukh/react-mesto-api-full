import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth";
import success from "../images/success.svg";
import unSuccess from "../images/unSuccess.svg";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [isLoading, SetIsLoading] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({ imgPath: "", text: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(userData) {
    SetIsLoading(true);
    api.setUserInfoApi(userData)
      .then((user) => {
        setCurrentUser(user.data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => SetIsLoading(false));
  }

  function handleUpdateAvatar(userData) {
    SetIsLoading(true);
    api
      .setUserAvatar(userData)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => SetIsLoading(false));
  }

  useEffect(() => {
    if (loggedIn) {
      SetIsLoading(true);
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([places, user]) => {
          setCards(places.data);
          setCurrentUser(user.currentUser);
        })
        .catch((err) => console.log(err))
        .finally(() => SetIsLoading(false));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleConfirmDeleteClick(card) {
    setCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardDelete(card) {
    SetIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((c) => {
            return c._id !== card._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => SetIsLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    SetIsLoading(true);
    api.addUserCard(cardData)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => SetIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    auth.getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.currentUser.email);
          history.push("/");
          }
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setEmail(res.data.email);
        setMessage({
          imgPath: success,
          text: "Вы успешно зарегистрировались!",
        });
      })
      .catch(() =>
        setMessage({
          imgPath: unSuccess,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      )
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then((token) => {
        auth.getContent(token)
          .then((res) => {
            setEmail(res.currentUser.email);

            setLoggedIn(true);
            history.push("/");
          })
          .catch((err) => {
            setLoggedIn(false);
            setMessage({
              imgPath: unSuccess,
              text: "Что-то пошло не так! Попробуйте ещё раз.",
            });
            console.log(err);
          })
      })
      .catch((err) => console.log(err)) 
  }
  
  function onSignOut() {
    auth.logout()
    setLoggedIn(false)
    setCards([])
    setCurrentUser({})
    history.push('/sign-in')
  }

 return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditInfo={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onConfirmDelete={handleConfirmDeleteClick}
              handleCardLike={handleCardLike}
              onCardClick={handleCardClick}
              cards={cards}
              isLoading={isLoading}
            />
            <Route path="/sign-in">
              <Register
                isOpen={isEditProfilePopupOpen}
                onRegister={handleRegistration}
                isInfoTooltipOpen={isInfoTooltipOpen}
              />
            </Route>
            <Route path="/sign-up">
              <Login isOpen={isEditProfilePopupOpen} onAuth={handleLogin} />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            name="tooltip"
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            title={message.text}
            imgPath={message.imgPath}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <ConfirmDeletePopup
            title="Вы уверены?"
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onConfirmDelete={handleCardDelete}
            isLoading={isLoading}
            card={card}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
