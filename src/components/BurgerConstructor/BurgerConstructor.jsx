import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { currentBunId } from "../../utils/data";
import Modal from "../Modal/Modal";
import useModalController from "../../hooks/ModalController";
import OrderDetails from "../Modal/OrderDetails";
import {
  ContructorIngredientsContext,
  IngredientsDataContext,
} from "../../utils/context";

const BurgerConstructor = () => {
  const { contructorIngredients } = React.useContext(
    ContructorIngredientsContext
  );
  const currentBunId = contructorIngredients.bunId;

  return (
    <div className={styles.burgerParts}>
      <BunElem type="top" currentBunId={currentBunId} />

      <div className={styles.inredientList}>
        <IngredientList />
      </div>

      <BunElem type="bottom" currentBunId={currentBunId} />

      <OrderBtn />
    </div>
  );
};

const BunElem = ({ type, currentBunId }) => {
  const ingredientData = React.useContext(IngredientsDataContext);

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

const IngredientList = () => {
  const ingredientData = React.useContext(IngredientsDataContext);
  const { contructorIngredients } = React.useContext(
    ContructorIngredientsContext
  );
  const constructorIngedientsList = contructorIngredients.ingredients;

  return (
    <>
      {constructorIngedientsList.map((listElem, index) => {
        const currentIngredient = ingredientData.find(
          (ingredientElem) => ingredientElem._id === listElem
        );
        if (!currentIngredient) return <div>ингридиент потерялся</div>;
        return (
          <div
            className={styles.elementBox_dragable}
            // key={currentIngredient._id}
            key={index}
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
    </>
  );
};

const OrderBtn = () => {
  const modalControl = useModalController();
  const ingredientData = React.useContext(IngredientsDataContext);

  const { contructorIngredients } = React.useContext(
    ContructorIngredientsContext
  );
  const constructorIngedientsList = contructorIngredients.ingredients;

  const currentBunElem = ingredientData.find((val) => val._id === currentBunId);
  const sum =
    constructorIngedientsList.reduce((sumVal, listElem) => {
      const currentIngredient = ingredientData.find(
        (ingredientElem) => ingredientElem._id === listElem
      );
      return sumVal + (currentIngredient ? currentIngredient.price : 0);
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
        <Button type="primary" size="medium" onClick={modalControl.openModal}>
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={modalControl.isModalOpen}
        closeModal={modalControl.closeModal}
      >
        <OrderDetails />
      </Modal>
    </>
  );
};

 
BunElem.propTypes = {
  type: PropTypes.string.isRequired,
  currentBunId: PropTypes.string,
};

 

export default BurgerConstructor;
