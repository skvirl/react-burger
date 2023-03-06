import Style from "./ProfileNav.module.css";
import ProfileNavLink from "../ProfileNavLink/ProfileNavLink";

export const ProfileNav = () => (
  <div className={Style.menu}>
    <div className={Style.menu__nav}>
      <ProfileNavLink to="/profile">Профиль</ProfileNavLink>
      <ProfileNavLink to="/orderHistory">История</ProfileNavLink>
      <ProfileNavLink to="/logout">Выход</ProfileNavLink>
    </div>
    <div className={Style.menu__description}>
      В этом разделе вы можете изменить свои персональные данные
    </div>
  </div>
);
