import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardNameRef = useRef();
  const cardLinkRef = useRef();

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      cardNameRef.current.value = "";
      cardLinkRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      buttonName="create"
      buttonText="Создать"
    >
      <input
        type="text"
        name="title"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        ref={cardNameRef}
      />

      <span id="title-error" className="popup__input-error"></span>

      <input
        type="url"
        name="url"
        className="popup__input popup__input_type_url"
        placeholder="Ссылка на картинку"
        required
        ref={cardLinkRef}
      />

      <span id="url-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
