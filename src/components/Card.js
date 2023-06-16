import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import heartWhite from "../images/blackheart-icon.svg";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { cardOwnerId, link, Name, likes, onCardLike, onCardDelate } = props;
  const isOwn = cardOwnerId === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);

  function handleClickCard() {
    props.onCardClick(props);
  }
  function handleDelateCard() {
    onCardDelate(props);
  }

  return (
    <div className={`card animation__join-up`}>
      <button
        type="button"
        className={`card__delete-button ${
          isOwn ? "card__delete-button_active" : ""
        }`}
        aria-label="trash"
        onClick={handleDelateCard}
      ></button>
      <img
        className="card__image"
        src={link}
        alt={Name}
        onClick={handleClickCard}
      />
      <img
        className={`card__like ${isLiked ? "card__like_on" : ""}`}
        src={heartWhite}
        alt={"heart like"}
      />
      <div className="card__information animation__join-left">
        <h2 className="card__title">{Name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_on" : ""
            }`}
            aria-label="Like button"
            onClick={onCardLike}
          ></button>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
