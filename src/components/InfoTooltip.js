import React from "react";
import accepted from "../images/accepted.jpg";
import denied from "../images/denied.jpg";

const InfoTooltip = ({
  errorRegister,
  errorLogin,
  infoToolOpen,
  handleClose,
}) => {
  return (
    <div
      className={`popup ${
        infoToolOpen ? "popup_opened" : "popup_opened-mainPage"
      }`}
    >
      <div className="popup__container infoTooltip">
        <button
          alt="Icono de cerrar"
          className="popup__close-button"
          onClick={handleClose}
        ></button>
        {errorRegister ? (
          <>
            <img src={denied} alt="Icono de rechazo" className="popup__image" />
            <h2 className="popup__title popup__title_tooltip">
              {errorLogin
                ? "Uy, algo salió mal. Por favor, inténtalo de nuevo"
                : "Uy, algo salió mal. Escriba correctamente su password/email"}
            </h2>
          </>
        ) : (
          <>
            <img
              src={accepted}
              alt="Icono de aprobación"
              className="popup__image"
            />
            <h2 className="popup__title popup__title_tooltip">
              {errorLogin ? "Bienvenido amo" : "¡Correcto! Ya estás registrado"}
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;
