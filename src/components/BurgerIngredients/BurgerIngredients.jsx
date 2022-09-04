import React from "react";
import PropTypes from 'prop-types';
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientData } from "../../utils/data";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <div className={styles.title + " text text_type_main-large"}>
        Соберите бургер
      </div>
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
        <IngredientGroup name="Булки" type="bun" alt="Булка" />
        <IngredientGroup name="Соусы" type="sauce" alt="Соус" />
        <IngredientGroup name="Начинки" type="main" alt="Начинка" />
      </div>
    </>
    
  );
};

const IngredientGroup = ({ name, type, alt }) => {
  return (
    <>
      <div className={styles.ingredientGroup}>
        <div className={'text text_type_main-medium '+styles.ingredientGroup__name}>{name}</div>
        <div
          className={styles.ingredientGroup__cards}>
          {ingredientData
            .filter((val) => {
              return val.type === type;
            })
            .map((val) => (
               <IngredientView elem={val} alt={alt} key ={val._id} />
            ))}
        </div>
      </div>
    </>
  );
};

const IngredientView = ({ elem, alt }) => {
  const { _id, image, price, name } = elem;
  return (
    <div className={styles.ingredient__Card} key={_id}>
      <img src={image} alt={alt} className={styles.ingredient__Picture} />
      <div className={styles.ingredient__priceBox}>
        <div className={'text text_type_digits-default '+styles.ingredient__price}>{price}</div>
        <div className={styles.ingredient__CurrencyIcon}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <div className={'text text_type_main-default '+styles.ingredient__name}>{name}</div>
    </div>
  );
};

IngredientGroup.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  alt: PropTypes.string
};

IngredientView.propTypes = {
  elem: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    price:  PropTypes.number,
    name: PropTypes.string,
     
    fontSize: PropTypes.number
  }),
  alt: PropTypes.string
}; 

export default BurgerIngredients;
//{(()=>{console.log(name); return 'a'})()}
