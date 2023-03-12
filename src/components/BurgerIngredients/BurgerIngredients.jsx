import { useState, useEffect, useRef } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../Modal/IngredientDetails";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { cleanIngredientDetails } from "../../services/slices/ingredientDetails";
import { ingredientTabs } from "../../utils/data";
import { ingredientTypes } from "../../utils/itemTypes";
import IngredientGroup from "../IngredientGroup/IngredientGroup";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState(ingredientTypes.BUN);
  const [observer, setObserver] = useState(null);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) =>
    Boolean(state.ingredientDetails.ingredientDetails)
  );

  const ingredientViewport = useRef();

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        (entries) => {
          const group = entries[0];
          const target = group?.target;
          const nextSib = target?.nextSibling;

          // filter out lower viewport bound crossings
          if (group.boundingClientRect.top > group.rootBounds.top) {
            return;
          }

          const result = group.isIntersecting
            ? target?.dataset?.type
            : nextSib?.dataset?.type;

          setCurrentTab(result);
        },
        {
          root: ingredientViewport.current,
          threshold: 0.5,
        }
      )
    );
  }, [ingredientViewport]);

  return (
    <>
      <h1 className={styles.title + " text text_type_main-large"}>
        Соберите бургер
      </h1>
      <div className={styles.tabs}>
        {ingredientTabs.map((tab) => (
          <Tab
            className={styles.tab}
            value={tab.value}
            active={currentTab === tab.value}
            onClick={setCurrentTab}
            key={tab.value}
          >
            {tab.name}
          </Tab>
        ))}
      </div>
      <div ref={ingredientViewport} className={styles.groupsList}>
        {ingredientTabs.map((tab) => (
          <IngredientGroup
            name={tab.name}
            type={tab.value}
            alt={tab.alt}
            observer={observer}
            key={tab.value}
          />
        ))}
      </div>
      {/* {
        <Modal
          isOpen={isModalOpen}
          closeModal={() => {
            dispatch(cleanIngredientDetails());
          }}
        >
          <IngredientDetails />
        </Modal>
      } */}
    </>
  );
};

export default BurgerIngredients;
