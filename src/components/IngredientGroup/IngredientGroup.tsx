import { useEffect, useRef, useMemo, FC } from "react";
import styles from "./IngredientGroup.module.css";
import IngredientView from "../IngredientView/IngredientView";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";

const IngredientGroup: FC<{
  name: string;
  type: string;
  alt: string;
  observer: IntersectionObserver;
}> = ({ name, type, alt, observer }) => {
  const getStoreData = (state: RootState) => ({
    ingredientData: state.burgerIngredients.burgerIngredients,
    selectedBunId: state.burgerConstructor.selectedBunId,
  });
  const { ingredientData, selectedBunId } = useAppSelector(getStoreData);

  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observer) return;

    const ingredientGroupElement = groupRef.current;
    ingredientGroupElement && observer.observe(ingredientGroupElement);

    return () => {
      ingredientGroupElement && observer.unobserve(ingredientGroupElement);
    };
  }, [observer, groupRef]);

  const filteredIngedientData = useMemo(
    () =>
      ingredientData?.filter((val) => {
        return val.type === type && val._id !== selectedBunId;
      }),
    [ingredientData, type, selectedBunId]
  );

  return (
    <div className={styles.ingredientGroup} ref={groupRef} data-type={type}>
      <div
        className={"text text_type_main-medium " + styles.ingredientGroup__name}
      >
        {name}
      </div>
      <div
        className={styles.ingredientGroup__cards}
        data-cy={`ingredientGroup__${type}`}
      >
        {filteredIngedientData?.map((val) => (
          <IngredientView elem={val} alt={alt} key={val._id} />
        ))}
      </div>
    </div>
  );
};

export default IngredientGroup;
