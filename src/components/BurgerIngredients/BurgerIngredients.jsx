import { useState, useEffect, useRef } from "react";
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
import useModalController from "../../hooks/ModalController";
import { useSelector } from "react-redux";
import {
  setIngredientDetails,
  cleanIngredientDetails,
} from "../../services/reducers/burgerSlice";
import { useDispatch } from "react-redux";
import { useDrag, DragPreviewImage } from "react-dnd";
import { ingredientTabs } from "../../utils/data";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const [observer, setObserver] = useState();
  const modalControl = useModalController();
  const dispacth = useDispatch();

  const ingredientViewport = useRef();

    

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        (entries,obs) => {
          console.log(entries.length);
          entries.forEach((group) => {

            const res = group.isIntersecting?
             group.target.firstChild.innerText :  
             group.target.nextSibling.firstChild.innerText;
             console.log(res);
          });
        },
        { 
          root: ingredientViewport.current,
           threshold: 0.5
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
            active={current === tab.value}
            onClick={setCurrent}
            key={tab.value}
          >
            {tab.name}
          </Tab>
        ))}
      </div>
      <div ref={ingredientViewport} className={styles.groupsList}>
        {ingredientTabs.map((tab) => (
          <IngredientGroup
            openModal={modalControl.openModal}
            name={tab.name}
            type={tab.value}
            alt={tab.alt}
            observer={observer}
            key={tab.value}
          />
        ))}
      </div>
      {modalControl.isModalOpen && (
        <Modal
          isOpen={modalControl.isModalOpen}
          closeModal={() => {
            modalControl.closeModal();
            dispacth(cleanIngredientDetails());
          }}
        >
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

const IngredientGroup = ({ name, type, alt, openModal, observer }) => {
  const { ingredientData, selectedBunId } = useSelector((state) => ({
    ingredientData: state.burger.burgerIngredients,
    selectedBunId: state.burger.selectedBunId,
  }));

  const groupRef = useRef();

  useEffect(() => {
    if (!observer) return;

    const ingredientGroupElement = groupRef.current;
    console.log(ingredientGroupElement);
    ingredientGroupElement && observer.observe(ingredientGroupElement);
    return () =>
      ingredientGroupElement && observer.unobserve(ingredientGroupElement);
  }, [observer, groupRef]);

  return (
    <div className={styles.ingredientGroup} ref={groupRef}>
      <div
        
        className={"text text_type_main-medium " + styles.ingredientGroup__name}
      >
        {name}
      </div>
      <div className={styles.ingredientGroup__cards}>
        {ingredientData
          .filter((val) => {
            return val.type === type && val._id !== selectedBunId;
          })
          .map((val) => (
            <IngredientView
              elem={val}
              alt={alt}
              openModal={openModal}
              key={val._id}
            />
          ))}
      </div>
    </div>
  );
};

const IngredientView = ({ elem, alt, openModal }) => {
  const { _id, image, price, name } = elem;
  const dispacth = useDispatch();
  const constructorIngedientsList = useSelector(
    (state) => state.burger.burgerConstructor
  );

  const [{}, drag, preview] = useDrag({
    type: dragItemTypes.CONSTRUCTOR_LIST,
    item: { _id, itsBun: elem.type === "bun" },
  });

  const usedIngredientsCount = () =>
    constructorIngedientsList.reduce(
      (sum, val) => sum + (val._id === elem._id ? 1 : 0),
      0
    );

  return (
    <>
      <DragPreviewImage src={image} connect={preview} />
      <div
        ref={drag}
        className={styles.ingredient__Card}
        onClick={() => {
          dispacth(setIngredientDetails(elem));
          openModal();
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
        <Counter num={usedIngredientsCount()} />
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
  openModal: PropTypes.func.isRequired,
};

IngredientView.propTypes = {
  elem: ingredientType.isRequired,
  alt: PropTypes.string,
  quantity: PropTypes.number,
  openModal: PropTypes.func.isRequired,
};

Counter.propTypes = {
  num: PropTypes.number,
};

export default BurgerIngredients;
