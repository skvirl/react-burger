import PropTypes from "prop-types";
import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useMatch } from "react-router-dom";
import React from "react";


const AppHeader = () => {

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.leftNav}>
          <HeaderButton
            to="/"
            ico={BurgerIcon}
            title="Конструктор"
          />
          <HeaderButton
            to="/orders"
            ico={ListIcon}
            title="Лента заказов"
          />
        </nav>
        <div className={styles.logo + " header__logo"}>
          <Logo />
        </div>
        <nav className={styles.rightNav}>
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

const HeaderButton = ({ to, ico, title }) => {
  const navigate = useNavigate();
  const isActive = useMatch({ path: to, end: to.length === 1 });
  return (
    <button className={styles.button} onClick={() => navigate(to)}>
      <div className={styles.button__logo}>{React.createElement(ico, {type:(isActive?"primary":"secondary")}, null)}</div>
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

HeaderButton.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  ico: PropTypes.func,
};

export default AppHeader;
