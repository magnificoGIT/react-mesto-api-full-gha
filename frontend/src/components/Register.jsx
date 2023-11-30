import { Link } from "react-router-dom";
import logoMesto from "../images/header_logo_mesto.svg";
import { useState } from "react";

export default function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (formValue.email && formValue.password) {
      onRegister(formValue);
    }
  };

  return (
    <>
      <header className="header">
        <img
          src={logoMesto}
          alt="Чёрно-белый логотип, на котором написанно Mesto и меньшим шрифтом Russia"
          className="header__logo"
        />
        <Link to="/sign-in" className="header__auth-link">
          Войти
        </Link>
      </header>

      <form
        className="auth__form auth__form_type_entry"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <h2 className="auth__title auth__title_type_registration">
          Регистрация
        </h2>
        <input
          id="email-registration"
          className="auth__input auth__input_type_email"
          type="email"
          name="email"
          placeholder="Введите email"
          value={formValue.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          className="auth__input auth__input_type_password"
          type="password"
          id="password"
          name="password"
          placeholder="Введите пароль"
          value={formValue.password}
          onChange={handleChange}
          autoComplete="on"
        />
        <button
          className="auth__button auth__button_type_registration"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <div className="auth__question">
          <p className="auth__question-to-user">Уже зарегестрированы?</p>
          <Link to="/sign-in" className="auth__link-authorization">
            Войти
          </Link>
        </div>
      </form>
    </>
  );
}
