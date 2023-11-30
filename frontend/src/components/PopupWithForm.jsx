import iconClose from "../images/popup__button-icon_close.svg";

// Компонент который содержит основную разметку для всплывающих попапов
export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      {/* Контейнер для всплывающего попапа */}
      <div className="popup__container">
        {/* Кнопка закрытия всплывающего попапа */}
        <button
          type="button"
          className="popup__button popup__button_type_close"
          aria-label="close"
          onClick={props.onClose}
        >
          {/* Иконка крестика для кнопки закрытия попапа */}
          <img
            src={iconClose}
            alt="Иконка кнопки в виде крестика"
            className="popup__button-icon popup__button-icon_type_close"
          />
        </button>
        {/* Контейнер с формой */}
        <div className="popup__container-form">
          {/* Заголовок формы */}
          <h2 className="popup__title">{props.title}</h2>
          {/* Форма */}
          <form
            className={`popup__form popup__form_type_${props.name}`}
            name={`popup-form-${props.name}`}
            autoComplete="on"
            onSubmit={props.onSubmit}
          >
            {/* Дочерние элементы, переданные в компонент App */}
            {props.children}
            {/* Кнопка отправки формы */}
            <button
              type="submit"
              className={`"popup__button popup__button_type_save popup__button_type_${props.buttonName}"`}
            >
              {/* Текст кнопки отправки формы */}
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
