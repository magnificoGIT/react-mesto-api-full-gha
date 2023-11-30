import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoMesto from "../images/header_logo_mesto.svg";

export default function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      onLogin(formValue).then(() => {
        setFormValue("");
        navigate("/", { replace: true });
      });
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
        <Link to="/sign-up" className="header__auth-link">
          Регистрация
        </Link>
      </header>

      <form
        className="auth__form auth__form_type_entry"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <h2 className="auth__title auth__title_type_entry">Вход</h2>
        <input
          className="auth__input auth__input_type_email"
          type="email"
          name="email"
          id="email"
          placeholder="Введите email"
          value={formValue.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          className="auth__input auth__input_type_password"
          type="password"
          name="password"
          id="password"
          placeholder=" Введите пароль"
          value={formValue.password}
          onChange={handleChange}
          autoComplete="on"
        />
        <button className="auth__button auth__button_type_entry" type="submit">
          Войти
        </button>
      </form>
    </>
  );
}
