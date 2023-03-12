import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBurgerIngredients } from "../../services/slices/burgerIngredients";

const IngredientDetails = ({ modalUse }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const burgerIngredients = useSelector(
    (state) => state.burgerIngredients.burgerIngredients
  );

  useEffect(() => {
    !burgerIngredients && dispatch(fetchBurgerIngredients());
  }, [burgerIngredients]);

  if (!burgerIngredients) {
    return <></>;
  }

  const ingredientDetails = burgerIngredients.find((val) => val._id == id);

  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredientDetails;

  return (
    <div className={styles.ingredientDetails}>
      <div
        className={`text text_type_main-large ${
          styles.ingredientDetails__title
        } ${
          modalUse
            ? styles.ingredientDetails__title_modal
            : styles.ingredientDetails__title_page
        }`}
      >
        Детали ингредиента
      </div>
      <img
        src={image_large}
        alt="Ингредиент"
        className={styles.ingredientDetails__Picture}
      />
      <div
        className={
          `text text_type_main-medium ` + styles.ingredientDetails__name
        }
      >
        {name}
      </div>
      <div
        className={
          `text text_type_main-default text_color_inactive ` +
          styles.ingredientDetails__composition
        }
      >
        <CompositionBox title="Калории,ккал" val={calories} />
        <CompositionBox title="Белки, г" val={proteins} />
        <CompositionBox title="Жиры, г" val={fat} />
        <CompositionBox title="Углеводы, г" val={carbohydrates} />
      </div>
    </div>
  );
};

const CompositionBox = ({ title, val }) => {
  return (
    <div className={styles.ingredientDetails__compositionBox}>
      <div className={styles.ingredientDetails__compositionTitle}>{title}</div>
      <div className={styles.ingredientDetails__compositionText}>{val}</div>
    </div>
  );
};

export default IngredientDetails;

CompositionBox.propTypes = {
  title: PropTypes.string.isRequired,
  val: PropTypes.number,
};
