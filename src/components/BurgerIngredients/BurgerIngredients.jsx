import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";
import IngredientDetails from "../Modal/IngredientDetails";
import Modal from "../Modal/Modal";
import useModalController from "../../hooks/ModalController";

const BurgerIngredients = ({ ingredientData }) => {
  const [current, setCurrent] = React.useState("one");
  const [modalChildren, setModalChildren] = React.useState(null);

  const modalControl = useModalController();

  const modalChilrdenToggle = (event, newChildren) => {
    setModalChildren(newChildren);
    modalControl.openModal(event);
  };

  return (
    <>
      <h1 className={styles.title + " text text_type_main-large"}>
        Соберите бургер
      </h1>
      <div className={styles.tabs}>
        <Tab
          className={styles.tab + " "}
          value="one"
          active={current === "one"}
          onClick={setCurrent}
        >
          Булки
        </Tab>
        <Tab
          className={styles.tab}
          value="two"
          active={current === "two"}
          onClick={setCurrent}
        >
          Соусы
        </Tab>
        <Tab
          className={styles.tab}
          value="three"
          active={current === "three"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.groupsList}>
        <IngredientGroup
          modalChilrdenToggle={modalChilrdenToggle}
          ingredientData={ingredientData}
          name="Булки"
          type="bun"
          alt="Булка"
        />
        <IngredientGroup
          modalChilrdenToggle={modalChilrdenToggle}
          ingredientData={ingredientData}
          name="Соусы"
          type="sauce"
          alt="Соус"
        />
        <IngredientGroup
          modalChilrdenToggle={modalChilrdenToggle}
          ingredientData={ingredientData}
          name="Начинки"
          type="main"
          alt="Начинка"
        />
      </div>
      <Modal
        isOpen={modalControl.isModalOpen}
        closeModal={modalControl.closeModal}
      >
        {modalChildren}
      </Modal>
    </>
  );
};

const IngredientGroup = ({
  ingredientData,
  name,
  type,
  alt,
  modalChilrdenToggle,
}) => {
  return (
    <div className={styles.ingredientGroup}>
      <div
        className={"text text_type_main-medium " + styles.ingredientGroup__name}
      >
        {name}
      </div>
      <div className={styles.ingredientGroup__cards}>
        {ingredientData
          .filter((val) => {
            return val.type === type;
          })
          .map((val) => (
            <IngredientView
              elem={val}
              alt={alt}
              quantity={0}
              modalChilrdenToggle={modalChilrdenToggle}
              key={val._id}
            />
          ))}
      </div>
    </div>
  );
};

const IngredientView = ({ elem, alt, quantity, modalChilrdenToggle }) => {
  const { _id, image, price, name } = elem;
  return (
    <div
      className={styles.ingredient__Card}
      key={_id}
      onClick={(e) => {
        modalChilrdenToggle(e, <IngredientDetails ingredient={elem} />);
      }}
    >
      <img src={image} alt={alt} className={styles.ingredient__Picture} />
      <div className={styles.ingredient__priceBox}>
        <div
          className={
            "text text_type_digits-default " + styles.ingredient__price
          }
        >
          {price}
        </div>
        <div className={styles.ingredient__CurrencyIcon}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <div className={"text text_type_main-default " + styles.ingredient__name}>
        {name}
      </div>
      <Counter num={quantity} />
    </div>
  );
};

const Counter = ({ num }) => {
  return (
    num > 0 && (
      <div
        className={"text text_type_main-small " + styles.ingredient__counter}
      >
        {num}
      </div>
    )
  );
};

BurgerIngredients.propTypes = {
  ingredientData: PropTypes.arrayOf(ingredientType).isRequired,
};

IngredientGroup.propTypes = {
  ingredientData: PropTypes.arrayOf(ingredientType).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alt: PropTypes.string,
  modalChilrdenToggle: PropTypes.func.isRequired,
};

IngredientView.propTypes = {
  elem: ingredientType.isRequired,
  alt: PropTypes.string,
  quantity: PropTypes.number,
  modalChilrdenToggle: PropTypes.func.isRequired,
};

Counter.propTypes = {
  num: PropTypes.number,
};

export default BurgerIngredients;
//{(()=>{console.log(name); return 'a'})()}
