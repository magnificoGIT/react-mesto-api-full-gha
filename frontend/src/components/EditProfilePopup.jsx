import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleEditProfileSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="save-edit"
      buttonText="Сохранить"
      onSubmit={handleEditProfileSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleNameChange}
        value={name || ""}
      />

      <span id="name-error" className="popup__input-error"></span>

      <input
        type="text"
        name="about"
        className="popup__input popup__input_type_about-myself"
        minLength="2"
        maxLength="200"
        required
        onChange={handleDescriptionChange}
        value={description || ""}
      />

      <span id="about-error" className="popup__input-error "></span>
    </PopupWithForm>
  );
}
