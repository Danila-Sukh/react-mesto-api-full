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
  //Переменная текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  //состояние попапов - сейчас закрыты
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] =
    React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    React.useState(false);
  const [isAddCardPopupOpened, setIsAddCardPopupOpened] = React.useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  //почта юзера
  const [userEmail, setIsUserEmail] = React.useState("");
  //Путь пользователя в браузере
  const history = useHistory();

  //состояние попапа infoTooltip передаем текст и картинку
  const [infoTooltipImg, setIsInfoTooltipImg] = React.useState(imageGood);
  const [infoTooltipText, setIsInfoTooltipText] = React.useState(
    "Вы успешно зарегистрировались!"
  );

  //тут переменная для открытия popup с большой картинкой передаем в нее название и ссылку
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  // Переменная с массивом карточек
  const [cards, setCards] = React.useState([]);
  // Состояние залогиненного пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Функция открытия popup аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }
  // Функция открытия popup профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }
  // Функция открытия popup добавления карточки
  function handleAddCardClick() {
    setIsAddCardPopupOpened(true);
  }
  // Функция открытия popup с большой картинко

  function handlePopupBigImageClick(name, link) {
    setIsImagePopupOpened(true);
    setSelectedCard({ name, link });
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpened(true);
    setIsInfoTooltipImg(imageGood);
    setIsInfoTooltipText("Вы успешно зарегистрировались!");
  }

  //Функция закрытия всех popup
  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddCardPopupOpened(false);
    setIsImagePopupOpened(false);
    setIsInfoTooltipOpened(false);
  }
  // Функция для обновления данных юзера
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // Функция для обновления аватара юзера
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // Функция для добавления карточки
  function handleAddPlaceSubmit(data) {
    api
      .addPlaceCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Хук для закрытия popup на ESC
  React.useEffect(() => {
    if (
      isEditAvatarPopupOpened ||
      isEditProfilePopupOpened ||
      isAddCardPopupOpened ||
      isImagePopupOpened
    ) {
      // объявляем здесь обработчик для удаления
      function handleEsc(event) {
        if (event.key === "Escape") {
          closeAllPopups();
        }
      }

      document.addEventListener("keydown", handleEsc);

      // возвращаем колбэк для снятия обработчика, когда состояние попапа перестанет быть true
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

  // Функция закрытия popup при клике на пустую область
  function handlePopupOutsideClose(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  // Функция проверки лайка
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
  // Функция удаления лайка
  function handleCardDelete(card) {
    api
      .deletePlaceCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }
  // Функция клика на картинку карточки
  function onCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  }

  //функция регистрации
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

  //функция входа
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

  //Если залогинились, то перейти на главную страницу
  React.useEffect(() => {
    if (loggedIn === true) {
      history.push("/");
    }
  }, [loggedIn]);
  //Проверяем токен после каждого обновления
  React.useEffect(() => {
    tokenCheck();
  }, []);

  //Проверяю токен
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

  //загрузка информации после авторизации
  function allDataGet(jwt) {
    api
      .getAppInfo(jwt)
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }

  //функция выхода
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

        {/* popup редактирования профиля */}
        <EditProfilePopup
          isOpened={isEditProfilePopupOpened}
          onPopupClick={handlePopupOutsideClose}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* popup информации при регистрации */}
        <InfoTooltip
          isOpened={isInfoTooltipOpened}
          onClose={closeAllPopups}
          popupText={infoTooltipText}
          popupImg={infoTooltipImg}
          name="infoTooltip"
        />

        {/* popup добавления карточки */}
        <AddPlacePopup
          isOpened={isAddCardPopupOpened}
          onPopupClick={handlePopupOutsideClose}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* popup редактирования аватара */}
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
