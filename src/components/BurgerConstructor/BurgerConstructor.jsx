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
  ConstructorIngredientsContext,
  IngredientsDataContext,
} from "../../utils/context";
import { sendOrderData } from "../../utils/api";
import useFetch from "../../hooks/useFetch";

const BurgerConstructor = () => {
  const { constructorIngredients } = React.useContext(
    ConstructorIngredientsContext
  );
  const ingredientData = React.useContext(IngredientsDataContext);
  const currentBunElem = getBunElement(
    ingredientData,
    constructorIngredients.bunId
  );

  return (
    <div className={styles.burgerParts}>
      <BunElem type="top" currentBunElem={currentBunElem} />

      <div className={styles.inredientList}>
        <IngredientList />
      </div>

      <BunElem type="bottom" currentBunElem={currentBunElem} />

      <OrderBtn currentBunElem={currentBunElem} />
    </div>
  );
};

const BunElem = ({ type, currentBunElem }) => {

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
  const { constructorIngredients } = React.useContext(
    ConstructorIngredientsContext
  );
  const constructorIngedientsList = constructorIngredients.ingredients;

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

const OrderBtn = ({ currentBunElem }) => {
  const modalControl = useModalController();

  const ingredientData = React.useContext(IngredientsDataContext);

  const { constructorIngredients, dispatchСonstructor } = React.useContext(
    ConstructorIngredientsContext
  );
  const оrderSum = getOrderSum(
    ingredientData,
    constructorIngredients.ingredients,
    currentBunElem
  );

  const { isLoaded, hasError, data, executeApiRequest } = useFetch(() =>
    sendOrderData([
      constructorIngredients.bunId,
      ...constructorIngredients.ingredients,
      constructorIngredients.bunId,
    ])
  );

  return (
    <>
      <div className={styles.orderBtn}>
        <div className={styles.orderBtn__totalBox}>
          <div
            className={styles.orderBtn__total + " text text_type_digits-medium"}
          >
            {оrderSum}
          </div>
          <div className={styles.orderBtn__ico}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={() => {
            executeApiRequest();
            modalControl.openModal();
          }}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={modalControl.isModalOpen}
        closeModal={modalControl.closeModal}
      >
        <OrderDetails
          number={data?.order?.number}
          hasError={isLoaded && hasError}
        />
      </Modal>
      
    </>
  );
};

const getBunElement = (ingredientData, currentBunId) =>
  ingredientData.find((val) => val._id === currentBunId);

const getOrderSum = (ingredientData, ingedientsList, currentBunElem) => {
  const sum =
    ingedientsList.reduce((sumVal, listElem) => {
      const currentIngredient = ingredientData.find(
        (ingredientElem) => ingredientElem._id === listElem
      );
      return sumVal + (currentIngredient ? currentIngredient.price : 0);
    }, 0) +
    (currentBunElem ? currentBunElem.price : 0) * 2;

  return sum;
};

BunElem.propTypes = {
  type: PropTypes.string.isRequired,
  currentBunId: PropTypes.string,
};

export default BurgerConstructor;
