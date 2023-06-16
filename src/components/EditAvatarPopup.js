import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const avatarRef = React.useRef(currentUser.avatar);
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="image_profile"
      title="Cambiar foto de perfil"
      action="Save"
      isOpen={props.isOpen}
      onCLose={props.onCLose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field" htmlFor="popup-input-image">
        <input
          type="url"
          name="avatar"
          placeholder="Imagen URL"
          id="popup-input-image"
          className="popup__input"
          ref={avatarRef}
          value={undefined}
        />
        <span className="popup__error popup-input-image-error">
          Introduce una dirección web.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
