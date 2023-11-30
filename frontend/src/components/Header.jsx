import { Link } from "react-router-dom";
import logoMesto from "../images/header_logo_mesto.svg";

export default function Header({ userData, signOut }) {
  return (
    <header className="header">
      <img
        src={logoMesto}
        alt="Чёрно-белый логотип, на котором написанно Mesto и меньшим шрифтом Russia"
        className="header__logo"
      />
      <div className="header__container" style={{ display: "flex" }}>
        <p className="header__email-user">{userData.email}</p>
        <Link to="/sign-in" className="header__auth-link" onClick={signOut}>
          Выйти
        </Link>
      </div>
    </header>
  );
}
