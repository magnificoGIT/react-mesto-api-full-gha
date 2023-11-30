import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import * as mestoAuth from "../utils/mestoAuth.js";
import { getStorage } from "../utils/utils.js";
import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [statusRegistration, setStatusRegistration] = useState("");

  // Инициализация роутера для навигации между страницами
  const navigate = useNavigate();

  // Текстовые сообщения для InfoTooltip
  const textInfoRegistration = {
    success: "Вы успешно зарегестрировались!",
    error: "Что-то пошло не так! Попробуйте ещё раз",
  };

  // Получение токена из локального хранилища
  const getToken = getStorage("token");

  // Проверки наличия токена и его валидности для получения данных о пользователе
  useEffect(() => {
    getUserData();
  }, [getToken]);

  // Получить данные пользователя и карточек после успешной авторизации
  useEffect(() => {
    if (loggedIn) {
      // Выполнить два асинхронных запроса и обрабатоть результаты
      Promise.all([api.getsUserInfo(), api.getsInitialCards()])
        .then(([userData, dataCards]) => {
          setCurrentUser(userData);
          setCards(dataCards);
        })
        .catch((err) => {
          console.error(`Ошибка при получении данных: ${err}`);
        });
    }
  }, [loggedIn]);

  // Обработчики для открытия соответствующих попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  };

  // Обработчик клика по карточке который открывает попап с увеличенным изображением
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(`Ошибка удаления карточки с сервера: ${err}`);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка обновления данных о пользователе: ${err}`);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(id => id === currentUser._id);
    // Отправить запрос в API для изменения статуса лайка
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        // Обновить флаг isLiked на основе результата запроса
        const updatedCard = newCard.likes.some((item) => item._id === currentUser._id);
  
        setCards((state) =>
          state.map((c) => (c._id === card._id ? { ...newCard, isLiked: updatedCard } : c))
        );
      })
      .catch((err) => {
        console.error(`Ошибка загрузки лайка с сервера: ${err}`);
      });
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .updateAvatar(avatarData)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка при обновлении аватара: ${err}`);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка при добавлении карточки: ${err}`);
      });
  };

  const getUserData = () => {
    if (getToken) {
      // Если токен существует, вызываем функцию getContent из mestoAuth, чтобы получить информацию о пользователе
      mestoAuth
        .getContent(getToken)
        .then((res) => {
          // Если запрос успешен, устанавливаем флаг loggedIn в true и обновляем userEmail
          setLoggedIn(true);
          setUserData(res);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // Функция для обработки входа в профиль
  const handleLogin = (data) => {
    return mestoAuth
      .authorize(data)
      .then((res) => {
        // Если запрос на авторизацию успешен, сохраняем токен в локальное хранилище
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
      })
      .catch((err) => {
        console.error(`Ошибка при входе в профиль: ${err}`);
        setStatusRegistration("error");
        setIsInfoToolTipPopupOpen(true)
      });
  };

  // Функция для регистрации пользователя
  const handleRegister = (data) => {
    return mestoAuth
      .register(data)
      .then((res) => {
        if (res) {
          // Если запрос на регистрацию успешен, устанавливать текст успешной регистрации и перенаправлять пользователя на страницу входа
          setStatusRegistration("success");
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.error(`Ошибка при регистрации: ${err}`);
        setStatusRegistration("error");
      })
      // Откывать InfoTooltip для отображения информации о статусе регистрации
      .finally(() => setIsInfoToolTipPopupOpen(true));
  };

  // Функция для выхода из профиля. Удалить токен, очистить информацию о пользователе и установить флаг loggedIn в false для ограничения доступа к профилю
  const signOut = () => {
    localStorage.removeItem("token");
    setUserData({});
    setLoggedIn(false);
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/"
            element={
              <>
              
                <ProtectedRoute
                  signOut={signOut}
                  loggedIn={loggedIn}
                  userData={userData}
                  component={Header}
                />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />

                <ProtectedRoute loggedIn={loggedIn} component={Footer} />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={EditProfilePopup}
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={EditAvatarPopup}
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={AddPlacePopup}
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={ImagePopup}
                  name="img"
                  card={selectedCard}
                  onClose={closeAllPopups}
                />
              </>
            }
          />
        </Routes>

        <InfoTooltip
          name="info-tool-tip"
          onClose={closeAllPopups}
          textInfoRegistration={textInfoRegistration}
          isOpen={isInfoToolTipPopupOpen}
          statusRegistration={statusRegistration}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}
