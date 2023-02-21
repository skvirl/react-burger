import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";
import { dragItemTypes } from "../../utils/itemTypes";
import IngredientDetails from "../Modal/IngredientDetails";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  setIngredientDetails,
  cleanIngredientDetails,
} from "../../services/reducers/burgerSlice";
import { useDrag, DragPreviewImage } from "react-dnd";
import { ingredientTabs } from "../../utils/data";
import { ingredientTypes } from "../../utils/itemTypes";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState(ingredientTypes.BUN);
  const [observer, setObserver] = useState(null);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) =>
    Boolean(state.burger.ingredientDetails)
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
      {
        <Modal
          isOpen={isModalOpen}
          closeModal={() => {
            dispatch(cleanIngredientDetails());
          }}
        >
          <IngredientDetails />
        </Modal>
      }
    </>
  );
};

const IngredientGroup = ({ name, type, alt, observer }) => {
  const { ingredientData, selectedBunId } = useSelector((state) => ({
    ingredientData: state.burger.burgerIngredients,
    selectedBunId: state.burger.selectedBunId,
  }));

  const groupRef = useRef();

  useEffect(() => {
    if (!observer) return;

    const ingredientGroupElement = groupRef.current;
    ingredientGroupElement && observer.observe(ingredientGroupElement);
    return () =>
      ingredientGroupElement && observer.unobserve(ingredientGroupElement);
  }, [observer, groupRef]);

  const filteredIngedientData = useMemo(
    () =>
      ingredientData?.filter((val) => {
        return val.type === type && val._id !== selectedBunId;
      }),
    [ingredientData,type,selectedBunId]
  );

  return (
    <div className={styles.ingredientGroup} ref={groupRef} data-type={type}>
      <div
        className={"text text_type_main-medium " + styles.ingredientGroup__name}
      >
        {name}
      </div>
      <div className={styles.ingredientGroup__cards}>
        {filteredIngedientData?.map((val) => (
          <IngredientView
            elem={val}
            alt={alt}
            key={val._id}
          />
        ))}
      </div>
    </div>
  );
};

const IngredientView = ({ elem, alt }) => {
  const { _id, image, price, name } = elem;
  const dispacth = useDispatch();
  const constructorIngedientsList = useSelector(
    (state) => state.burger.burgerConstructor
  );

  const [, drag, preview] = useDrag({
    type: dragItemTypes.CONSTRUCTOR_LIST,
    item: { _id, itsBun: elem.type === ingredientTypes.BUN },
  });

  const ingredientsCount = useMemo(
    () => constructorIngedientsList ?
      constructorIngedientsList.reduce(
        (sum, val) => sum + (val._id === elem._id ? 1 : 0),
        0
      ) : 0,
    [constructorIngedientsList, elem]
  );

  return (
    <>
      <DragPreviewImage src={image} connect={preview} />
      <div
        ref={drag}
        className={styles.ingredient__Card}
        onClick={() => {
          dispacth(setIngredientDetails(elem));
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

IngredientGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alt: PropTypes.string,
  observer: PropTypes.object,
};

IngredientView.propTypes = {
  elem: ingredientType.isRequired,
  alt: PropTypes.string,
};

Counter.propTypes = {
  num: PropTypes.number,
};

export default BurgerIngredients;
