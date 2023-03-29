import styles from "./BunElem.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, FC } from "react";
import {  useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";

const BunElem: FC<{
  type?: 'top' | 'bottom'
}> = ({ type }) => {

  const getStoreData = (state:RootState) => ({
    ingredientData: state.burgerIngredients.burgerIngredients,
    selectedBunId: state.burgerConstructor.selectedBunId,
  });

  const { ingredientData, selectedBunId } = useAppSelector(getStoreData);

  const selectedBunElem = useMemo(
    () => ingredientData?.find((val) => val._id === selectedBunId),
    [ingredientData, selectedBunId]
  );

  if (!selectedBunElem) return <></>;

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
 
export default BunElem;
