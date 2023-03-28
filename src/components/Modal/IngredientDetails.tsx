import styles from "./IngredientDetails.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { FC, ReactNode } from 'react'

const modalUseTypeGuard = (modalUse: boolean | undefined) => modalUse !== undefined ? modalUse : false;

const IngredientDetails: FC<{
  modalUse?: boolean | undefined
}> = ({ modalUse }) => {
  const { id } = useParams();
  const burgerIngredients = useAppSelector(
    (state) => state.burgerIngredients.burgerIngredients
  );

  const emptyIngredient = <DetailsMain modalUse={modalUseTypeGuard(modalUse)} title='Ингридиент не найден'>{ }</DetailsMain>;
  if (!burgerIngredients) return emptyIngredient;

  const ingredientDetails = burgerIngredients.find((val) => val._id == id);
  if (ingredientDetails === undefined) return emptyIngredient;

  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredientDetails;

  return (

    <DetailsMain modalUse={modalUseTypeGuard(modalUse)} title='Детали ингредиента'>
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
    </DetailsMain>
  );
};

const DetailsMain: FC<{
  modalUse: boolean,
  title: string,
  children: ReactNode
}> = ({ modalUse, title, children }) => {
  return (
    <div className={styles.ingredientDetails}>
      <div
        className={`text text_type_main-large ${styles.ingredientDetails__title
          } ${modalUse
            ? styles.ingredientDetails__title_modal
            : styles.ingredientDetails__title_page
          }`}
      >
        {title}
      </div>
      {children}
    </div>

  );
};

const CompositionBox: FC<{
  title: string,
  val: number
}> = ({ title, val }) => {
  return (
    <div className={styles.ingredientDetails__compositionBox}>
      <div className={styles.ingredientDetails__compositionTitle}>{title}</div>
      <div className={styles.ingredientDetails__compositionText}>{val}</div>
    </div>
  );
};

export default IngredientDetails;

