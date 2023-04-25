import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useMatch } from "react-router-dom";
import React, { FC } from "react";

const AppHeader: FC = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.leftNav}>
          <HeaderButton to="/" ico={BurgerIcon} title="Конструктор" />
          <HeaderButton to="/feed" ico={ListIcon} title="Лента заказов" />
        </nav>
        <button
          className={styles.logo + " header__logo"}
          onClick={() => navigate("/")}
        >
          <Logo />
        </button>
        <nav className={styles.rightNav}  >
          <HeaderButton
            to="/profile"
            ico={ProfileIcon}
            title="Личный кабинет"
          />
        </nav>
      </div>
    </header>
  );
};

const HeaderButton: FC<{
  to: string;
  ico: typeof ProfileIcon; // any here, cause cant get TIconProps from ui-components
  title?: string;
}> = ({ to, ico, title }) => {
  const navigate = useNavigate();
  const isActive = useMatch({ path: to, end: to.length === 1 });
  return (
    <button className={styles.button} onClick={() => navigate(to)}>
      <div className={styles.button__logo}>
        {React.createElement(
          ico,
          { type: isActive ? "primary" : "secondary" },
          null
        )}
      </div>
      <span
        className={
          (isActive
            ? styles.button__title_primary
            : styles.button__title_secondary) + " text text_type_main-small"
        }
      >
        {title}
      </span>
    </button>
  );
};

export default AppHeader;
