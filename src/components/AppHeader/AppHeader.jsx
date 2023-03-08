import PropTypes from "prop-types";
import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
const AppHeader = () => {

  const navigate = useNavigate(); 


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.leftNav}>
          <HeaderButton
            type="primary"
            ico={<BurgerIcon type="primary" />}
            title="Конструктор"
            onClick = {()=>navigate('/')}
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
            onClick = {()=>navigate('/profile')}
          />
        </nav>
      </div>
    </header>
  );
};

const HeaderButton = ({ type, ico, title, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={styles.button__logo}>{ico}</div>
      <span
        className={
          (type === "primary"
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
  type: PropTypes.string,
  title: PropTypes.string,
  ico: PropTypes.element,
};

export default AppHeader;
