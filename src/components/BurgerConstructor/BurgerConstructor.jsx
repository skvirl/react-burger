import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ingredientData,
  currentBunId,
  constructorIngedientsList,
} from "../../utils/data";

const BurgerConstructor = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <div className={styles.inredientList}>
        <IngredientList />
      </div>
      <OrderBtn />
    </>
  );
};

const BunElem = ({ type, currentBunId }) => {
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
  return (
    <>
      <BunElem type="top" currentBunId={currentBunId} />
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
      <BunElem type="bottom" currentBunId={currentBunId} />
    </>
  );
};

const OrderBtn = () => {
  const currentBunElem = ingredientData.find((val) => val._id === currentBunId);
  const sum =
    constructorIngedientsList.reduce((sumVal, listElem) => {
      const currentIngredient = ingredientData.find(
        (ingredientElem) => ingredientElem._id === listElem._id
      );
      return sumVal + currentIngredient.price * listElem.count;
    }, 0) +
    currentBunElem.price * 2;

  return (
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
      <div className={styles.orderBtn__btn + " text text_type_main-default"}>
        Оформить заказ
      </div>
    </div>
  );
};

BunElem.propTypes = {
  type: PropTypes.string.isRequired,
  currentBunId: PropTypes.string.isRequired,
};

export default BurgerConstructor;
