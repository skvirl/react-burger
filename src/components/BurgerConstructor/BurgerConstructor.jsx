import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { currentBunId, constructorIngedientsList } from "../../utils/data";
import { Modal, ModalController } from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails";
import { ingredientType } from "../../utils/types";

const BurgerConstructor = ({ ingredientData }) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <div className={styles.inredientList}>
        <IngredientList ingredientData={ingredientData} />
      </div>
      <OrderBtn ingredientData={ingredientData} />
    </>
  );
};

const BunElem = ({ type, currentBunId, ingredientData }) => {
  const currentBunElem = ingredientData.find((val) => val._id === currentBunId);
  if (!currentBunElem) return;

  return (
    <div className={styles.elementBox}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={currentBunElem.name + (type === "top" ? " (верх)" : " (низ)")}
        price={currentBunElem.price}
        thumbnail={currentBunElem.image}
      />
    </div>
  );
};

const IngredientList = ({ ingredientData }) => {
  return (
    <>
      <BunElem
        type="top"
        currentBunId={currentBunId}
        ingredientData={ingredientData}
      />
      {constructorIngedientsList.map((listElem) => {
        const currentIngredient = ingredientData.find(
          (ingredientElem) => ingredientElem._id === listElem._id
        );
        if (!currentIngredient) return <div>ингридиент потерялся</div>;
        return (
          <div
            className={styles.elementBox_dragable}
            key={currentIngredient._id}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={currentIngredient.name}
              price={currentIngredient.price}
              thumbnail={currentIngredient.image}
            />
          </div>
        );
      })}
      <BunElem
        type="bottom"
        currentBunId={currentBunId}
        ingredientData={ingredientData}
      />
    </>
  );
};

const OrderBtn = ({ ingredientData }) => {
  const modalControl = ModalController();

  const currentBunElem = ingredientData.find((val) => val._id === currentBunId);
  const sum =
    constructorIngedientsList.reduce((sumVal, listElem) => {
      const currentIngredient = ingredientData.find(
        (ingredientElem) => ingredientElem._id === listElem._id
      );
      return (
        sumVal +
        (currentIngredient ? currentIngredient.price : 0) * listElem.count
      );
    }, 0) +
    (currentBunElem ? currentBunElem.price : 0) * 2;

  return (
    <>
      <div className={styles.orderBtn}>
        <div className={styles.orderBtn__totalBox}>
          <div
            className={styles.orderBtn__total + " text text_type_digits-medium"}
          >
            {sum}
          </div>
          <div className={styles.orderBtn__ico}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div
          className={styles.orderBtn__btn + " text text_type_main-default"}
          onClick={modalControl.modalToggle}
        >
          Оформить заказ
        </div>
      </div>
      <Modal
        isOpen={modalControl.isModalOpen}
        handleOpenModal={modalControl.modalToggle}
      >
        <div>
          <OrderDetails orderNumber={(Math.random()*1000000).toFixed(0)} />
          </div> 
      </Modal>
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredientData: PropTypes.arrayOf(ingredientType).isRequired,
};

BunElem.propTypes = {
  ingredientData: PropTypes.arrayOf(ingredientType).isRequired,
  type: PropTypes.string.isRequired,
  currentBunId: PropTypes.string.isRequired,
};

IngredientList.propTypes = {
  ingredientData: PropTypes.arrayOf(ingredientType).isRequired,
};

OrderBtn.propTypes = {
  ingredientData: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;
