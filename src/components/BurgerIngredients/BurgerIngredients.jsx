import { useState } from "react";
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
import { useSelector } from "react-redux";
import { setIngredientDetails, cleanIngredientDetails } from "../../services/reducers/burgerSlice";
import { useDispatch } from "react-redux";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const modalControl = useModalController();
  const dispacth = useDispatch();
  
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
          openModal={modalControl.openModal}
          name="Булки"
          type="bun"
          alt="Булка"
        />
        <IngredientGroup
          openModal={modalControl.openModal}
          name="Соусы"
          type="sauce"
          alt="Соус"
        />
        <IngredientGroup
          openModal={modalControl.openModal}
          name="Начинки"
          type="main"
          alt="Начинка"
        />
      </div>
      {modalControl.isModalOpen && (
        <Modal
          isOpen={modalControl.isModalOpen}
          closeModal={()=>{
            modalControl.closeModal();
            dispacth(cleanIngredientDetails());
          }}
        >
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

const IngredientGroup = ({ name, type, alt, openModal }) => {
  const ingredientData = useSelector((state) => state.burger.burgerIngredients);

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
              openModal={openModal}
              key={val._id}
            />
          ))}
      </div>
    </div>
  );
};

const IngredientView = ({ elem, alt, quantity, openModal }) => {
  const { _id, image, price, name } = elem;
  const dispacth = useDispatch();

  return (
    <div
      className={styles.ingredient__Card}
      key={_id}
      onClick={() => {
        dispacth(setIngredientDetails(elem));
        openModal();
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

IngredientGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alt: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

IngredientView.propTypes = {
  elem: ingredientType.isRequired,
  alt: PropTypes.string,
  quantity: PropTypes.number,
  openModal: PropTypes.func.isRequired,
};

Counter.propTypes = {
  num: PropTypes.number,
};

export default BurgerIngredients;
