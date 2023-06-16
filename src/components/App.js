import React, { useState } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Routes } from "react-router-dom";
import Header from "./Header.js";
import Login from "./Login.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Popup from "./Popup.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import Card from "./Card.js";
import DelateCardPopup from "./DelateCard.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
//import auth from "../utils/auth.js";

function App() {
  //?Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [access, setAccess] = useState(false);
  //?Profile
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [currentUser, setCurrentUser] = useState({});

  //?cards
  const [cards, setCard] = React.useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [newPlaceTitle, setNewPlaceTitle] = React.useState("");
  const [newPlaceLink, setNewPlaceLink] = React.useState("");

  //?image Popup
  const [eraseCardAsk, setEraseCardAsk] = useState(false);
  const [imagePic, setImagePic] = useState(false);

  React.useEffect(() => {
    api.getUserInfo().then((info) => {
      setCurrentUser(info);
    });
  }, []);

  React.useEffect(() => {
    api.getCardList().then((cards) => {
      setCard(cards);
    });
  }, []);

  //! function login user
  function handleLogin() {
    setLoggedIn(true);
  }
  //! function register user
  const userRegister = (password, email) => {
    auth.register(password, email);
  };

  const handleAccess = () => {
    setAccess(true);
  };
  //! function Card
  const renderCard = () =>
    cards.map((item) => {
      const { _id, owner, link, name, likes } = item;
      return (
        <Card
          key={_id}
          cardId={_id}
          cardOwnerId={owner._id}
          link={link}
          Name={name}
          likes={likes}
          onCardClick={handleClickCard}
          onCardDelate={handleEraseAsk}
          onCardLike={() => {
            handleCardLike(item);
          }}
        />
      );
    });
  function handleAddPlaceSubmit(data) {
    api.handleAddCard(data).then((newCard) => setCard([newCard, ...cards]));
    ClosePopups();
  }
  function handleNewPlaceTitleChance(e) {
    setNewPlaceTitle(e.target.value);
  }
  function handleNewPlaceLinkChance(e) {
    setNewPlaceLink(e.target.value);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id, !isLiked).then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.removeLike(card._id).then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleDelateCard(card) {
    api.removeCard(card.cardId).then(() => {
      function dontDeleteCard(item) {
        return item._id !== card.cardId;
      }
      const newCardArray = cards.filter(dontDeleteCard);
      setCard(newCardArray);
    });
  }

  //!Profile
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleUpdateUser(data) {
    api.setUserInfo(data).then(() => {
      api.getUserInfo().then((info) => {
        setCurrentUser(info);
      });
    });
    ClosePopups();
  }

  function handleUserNameChange(e) {
    // setUserName(e.target.value);
    setCurrentUser(Object.assign({}, currentUser, { name: e.target.value }));
  }

  function handleUserAboutChange(e) {
    // setUserAbout(e.target.value);
    setCurrentUser(Object.assign({}, currentUser, { about: e.target.value }));
  }

  //!Edit avatar
  function handleUpdateAvatar(avatar) {
    api
      .handleChangeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
    ClosePopups();
  }

  //!Card
  function handleClickCard(card) {
    setSelectedCard(card);
    setImagePic(true);
  }
  function handleEraseAsk(card) {
    setEraseCardAsk(true);
    setSelectedCard(card);
  }

  function ClosePopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setEraseCardAsk(false);
    setSelectedCard("");
    setImagePic(false);
    setAccess(false);
  }

  function mainPage() {
    return (
      <Main
        onEditAvatarPopupOpen={handleEditAvatarClick}
        onEditProfilePopupOpen={handleEditProfileClick}
        onAddPlacePopupOpen={handleAddPlaceClick}
        onCardClick={handleClickCard}
        onDeleteAsk={handleEraseAsk}
        rendererCard={renderCard}
      />
    );
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Popup isOpen={false}>
          <InfoTooltip />
        </Popup>

        <Popup isOpen={isEditProfilePopupOpen} onClose={ClosePopups}>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onCLose={ClosePopups}
            onUpdateUser={handleUpdateUser}
            onUserNameChange={handleUserNameChange}
            userDescriptionChange={handleUserAboutChange}
          />
        </Popup>

        <Popup isOpen={isAddPlacePopupOpen} onClose={ClosePopups}>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onCLose={ClosePopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            onNewPlaceTitleChange={handleNewPlaceTitleChance}
            onNewPlaceLinkChange={handleNewPlaceLinkChance}
            setNewPlaceTitle={setNewPlaceTitle}
            setNewPlaceLink={setNewPlaceLink}
            newPlaceTitle={newPlaceTitle}
            newPlaceLink={newPlaceLink}
          />
        </Popup>

        <Popup isOpen={isEditAvatarPopupOpen} onClose={ClosePopups}>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onCLose={ClosePopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </Popup>

        <Popup isOpen={imagePic} onClose={ClosePopups}>
          <ImagePopup
            info={selectedCard}
            isOpen={imagePic}
            onClose={ClosePopups}
          />
        </Popup>
        <Popup isOpen={eraseCardAsk} onClose={ClosePopups}>
          <DelateCardPopup
            isOpen={eraseCardAsk}
            onClose={ClosePopups}
            eraseDelate={handleDelateCard}
            card={selectedCard}
          />
        </Popup>
        <Routes>
          <Route
            exact
            path="/"
            element={<ProtectedRoute loggedIn={loggedIn} />}
          >
            <Route path="/" element={mainPage()}></Route>
          </Route>
          <Route path="/signUp" element={<Register access={handleAccess} />} />
          <Route path="/signIn" element={<Login access={handleAccess} />} />
        </Routes>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
