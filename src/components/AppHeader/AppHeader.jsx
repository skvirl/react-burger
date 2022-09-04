import React from "react";
import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.leftNav}>
            <HeaderButton
              type="primary"
              ico={<BurgerIcon type="primary" />}
              title="Конструктор"
            />
            <HeaderButton
              type="secondary"
              ico={<ListIcon type="secondary" />}
              title="Лента заказов"
            />
          </nav>
          <div className={styles.logo + " header__logo"}>
            <Logo />
          </div>
          <nav className={styles.rightNav}>
            <HeaderButton
              type="secondary"
              ico={<ProfileIcon type="secondary" />}
              title="Личный кабинет"
            />
          </nav>
        </div>
      </header>
    );
  }
}

//className="App ml-5 mr-5 mb-5 mt-5"
const HeaderButton = ({ type, ico, title }) => {
  return (
    <div className={styles.button}>
      <div className={styles.button__logo}>{ico}</div>
      <span
        className={
          (type === "primary"
            ? styles.button__title_primary
            : styles.button__title_secondary) 
            + " text text_type_main-small"
        }
      >
        {title}
      </span>
    </div>
  );
};
