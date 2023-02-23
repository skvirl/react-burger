import styles from "./BurgerConstructor.module.css";
import { dragItemTypes } from "../../utils/itemTypes";
import { useDispatch } from "react-redux";
import {
  setBun,
  addConstrucorIngredient,
} from "../../services/slices/burgerConstructor";
import { v4 } from "uuid";
import { useDrop } from "react-dnd";
import BunElem from '../BunElem/BunElem'
import ConstructorIngredientList from '../ConstructorIngredientList/ConstructorIngredientList'
import OrderBtn from '../OrderBtn/OrderBtn'

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: dragItemTypes.CONSTRUCTOR_LIST,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop({ _id, itsBun }) {
      if (itsBun) {
        dispatch(setBun(_id));
      } else {
        dispatch(
          addConstrucorIngredient({
            constructorId: v4(),
            ingredientId: _id,
          })
        );
      }
    },
  });
  return (
    <div ref={drop} className={styles.burgerParts}>
      <BunElem type="top" />

      <div className={styles.inredientList}>
        <ConstructorIngredientList />
      </div>

      <BunElem type="bottom" />

      <OrderBtn />
    </div>
  );
};

export default BurgerConstructor;
