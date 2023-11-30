import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarInputRef = useRef();

  const handleEditAvatarSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      avatarInputRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="update"
      buttonText="Сохранить"
      onSubmit={handleEditAvatarSubmit}
    >
      <input
        type="url"
        name="avatar"
        className="popup__input popup__input_type_url-avatar"
        placeholder="Ссылка на изображение"
        required
        ref={avatarInputRef}
      />

      <span id="avatar-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
