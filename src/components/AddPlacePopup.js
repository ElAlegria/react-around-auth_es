import React from "react";
import PopupWithForm from "./PopupWithForm";

 function AddPlacePopup(props) {
  
  const {newPlaceLink,newPlaceTitle} = props

  function handleSubmit(e){
    e.preventDefault()
    props.onAddPlaceSubmit({newPlaceTitle,newPlaceLink});
    props.setNewPlaceLink('')
    props.setNewPlaceTitle('')
  }


  return (
    <PopupWithForm
      name="add_card"
      title="Nuevo lugar"
      action="Save"
      isOpen={props.isOpen}
      onCLose={props.onCLose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field" htmlFor="popup-input-title">
        <input
          type="text"
          name="title"
          placeholder="Titulo"
          id="popup-input-title"
          className="popup__input"
          minLength="2"
          maxLength="30"
          value={newPlaceTitle}
          onChange={props.onNewPlaceTitleChange}
          required
        />
        <span className="popup__error popup-input-title-error">
          Por favor, rellena este campo.
        </span>
      </label>
      <label className="popup__field" htmlFor="popup-input-link">
        <input
          type="url"
          name="image-link"
          placeholder="Imagen URL"
          id="popup-input-link"
          className="popup__input"
          value={newPlaceLink}
          onChange={props.onNewPlaceLinkChange}
          required
        />
        <span className="popup__error popup-input-link-error">
          Por favor, introduce una dirección web.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup

