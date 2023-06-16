function ImagePopup(props) {

  const { isOpen, info, onClose } = props;
  
  return (
    <div
      className={`popup__container popup__container_role-image ${
        props.isOpen ? "animation__join-left" : ""
      }
    `}
    >
      <figure className="image__figure">
        <img
          src={`${isOpen ? info.link : ""}`}
          alt={info.cardName}
          className={"image__popup"}
        />
        <figcaption className="popup__caption">{info.cardName}</figcaption>
      </figure>
      <button
        type="button"
        className="popup__close-button popup__preview-close-button"
        aria-label="close button"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default ImagePopup;

//``
