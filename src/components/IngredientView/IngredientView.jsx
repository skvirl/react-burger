import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./IngredientView.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";
import { dragItemTypes, ingredientTypes } from "../../utils/itemTypes";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { setIngredientDetails } from "../../services/slices/ingredientDetails";

const IngredientView = ({ elem, alt }) => {
  const { _id, image, price, name } = elem;
  const dispacth = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const constructorIngedientsList = useSelector(
    (state) => state.burgerConstructor.burgerConstructor
  );

  const [, drag, preview] = useDrag({
    type: dragItemTypes.CONSTRUCTOR_LIST,
    item: { _id, itsBun: elem.type === ingredientTypes.BUN },
  });

  const ingredientsCount = useMemo(
    () =>
      constructorIngedientsList
        ? constructorIngedientsList.reduce(
            (sum, val) => sum + (val._id === elem._id ? 1 : 0),
            0
          )
        : 0,
    [constructorIngedientsList, elem]
  );

  return (
    <>
      <DragPreviewImage src={image} connect={preview} />
      <div
        ref={drag}
        className={styles.ingredient__Card}
        onClick={() => {
          navigate(`/ingredients/${elem._id}`, {
            state: { background: location },
          });
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
        <div
          className={"text text_type_main-default " + styles.ingredient__name}
        >
          {name}
        </div>
        <Counter num={ingredientsCount} />
      </div>
    </>
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

IngredientView.propTypes = {
  elem: ingredientType.isRequired,
  alt: PropTypes.string,
};

Counter.propTypes = {
  num: PropTypes.number,
};

export default IngredientView;
