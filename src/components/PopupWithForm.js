import React from "react";

function PopupWithForm(props) {

  const { onCLose,onSubmit } = props;
  
  // ``
  return (
    <>
      <div
        className={`popup__container popup_${props.name} ${
          props.isOpen ? "animation__scale" : ""
        }`}
        name={props.name}
      >
        <button
          className={`popup__close-button`}
          id={`popup__closet-${props.name}`}
          type="button"
          aria-label="close button"
          onClick={onCLose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form ${props.name}`}
          name={props.name}
          noValidate
        >
          {props.children}
        </form>
        <button
          className={`popup__button popup__button_type_${props.name}`}
          id={`popup__closet-${props.name}_submit`}
          type="Submit"
          aria-label="save button"
          onClick={(e) => onSubmit(e)}
        >
          {props.action}
        </button>
      </div>
    </>
  );
}
export default PopupWithForm;
