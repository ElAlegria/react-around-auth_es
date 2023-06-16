import accessIcon from "../images/access-icon-__true.png";
import negateIcon from "../images/access-icon-negate.png";
import closeIcon from "../images/Close-Icon.png";
function InfoTooltip(props) {
  const { access } = props;
  return (
    <>
      <section className="InfoToolTip">
        <img
          className="InfoToolTip__button-close popup__close-button"
          alt="Close popup"
          src={closeIcon}
        />

        <img
          className="InfoTooltipe__access-icon "
          src={access ? accessIcon : negateIcon}
          alt="access icon and negative icon"
        />
        <p className="InfoTooltipe__info">
          {access
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </section>
    </>
  );
}

export default InfoTooltip;
