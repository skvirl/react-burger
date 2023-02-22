import styles from "./BunElem.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import PropTypes from "prop-types";

const BunElem = ({ type }) => {
  const { ingredientData, selectedBunId } = useSelector((state) => ({
    ingredientData: state.burgerIngredients.burgerIngredients,
    selectedBunId: state.burgerConstructor.selectedBunId,
  }));

  const selectedBunElem = useMemo(
    () => ingredientData?.find((val) => val._id === selectedBunId),
    [ingredientData, selectedBunId]
  );

  if (!selectedBunElem) return;

  return (
    <div className={styles.elementBox}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={selectedBunElem.name + (type === "top" ? " (верх)" : " (низ)")}
        price={selectedBunElem.price}
        thumbnail={selectedBunElem.image}
      />
    </div>
  );
};

BunElem.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BunElem;
