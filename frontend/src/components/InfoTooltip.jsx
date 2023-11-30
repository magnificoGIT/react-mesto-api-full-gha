import iconClose from "../images/popup__button-icon_close.svg";
import iconSuccess from "../images/success.svg";
import iconError from "../images/error.svg";

export default function InfoTooltip({
  name,
  isOpen,
  onClose,
  statusRegistration,
  textInfoRegistration,
}) {
  return (
    <>
      <div className={`popup popup-${name} ${isOpen ? "popup_active" : ""}`}>
        <div className="popup__container popup__container_type_auth">
          <button
            type="button"
            className="popup__button popup__button_type_close"
            aria-label="close"
            onClick={onClose} // Обработчик клика по кнопке закрытия
          >
            {/* Иконка закрытия */}
            <img
              src={iconClose}
              alt="Иконка кнопки в виде крестика"
              className="popup__button-icon popup__button-icon_type_close"
            />
          </button>
          <div className="popup__container-form popup__container-form_type_auth">
            <img
              src={statusRegistration == "success" ? iconSuccess : iconError}
              alt="Статус регистарции"
              className="popup__image-auth"
            />
            <h2 className="popup__title popup__title_type_auth">
              {statusRegistration == "success"
                ? textInfoRegistration.success
                : textInfoRegistration.error}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
