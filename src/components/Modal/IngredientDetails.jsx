
import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";


const IngredientDetails = ({ image_large, name, calories, proteins ,fat ,carbohydrates }) => {
  
    return (
      <div className={styles.ingredientDetails}>
        <div className={`text text_type_main-large `+styles.ingredientDetails__title}>Детали ингредиента</div>
        <img src={image_large} alt='Ингредиент' className={styles.ingredientDetails__Picture} />
        <div className={`text text_type_main-medium `+styles.ingredientDetails__name}>{name}</div>
        <div className={`text text_type_main-default text_color_inactive `+styles.ingredientDetails__composition}>

         <CompositionBox title='Калории,ккал' val = {calories} />
         <CompositionBox title='Белки, г' val = {proteins} />
         <CompositionBox title='Жиры, г' val = {fat} />
         <CompositionBox title='Углеводы, г' val = {carbohydrates} />

        </div>
      </div>
    )
};

const CompositionBox = ({ title,val }) => {
  
    return (
        <div className={styles.ingredientDetails__compositionBox}>
            <div className={styles.ingredientDetails__compositionTitle}>
                {title}
            </div>
            <div className={styles.ingredientDetails__compositionText}>
                {val}
            </div>
        </div>
    )
};
 
export default IngredientDetails;

IngredientDetails.propTypes = {
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
};

CompositionBox.propTypes = {
  title: PropTypes.string.isRequired,
  val: PropTypes.number,
};
