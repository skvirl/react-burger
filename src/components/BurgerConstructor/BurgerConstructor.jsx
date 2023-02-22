import { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails";
import { dragItemTypes } from "../../utils/itemTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  setBun,
  fetchOrder,
  cleanOrderDetails,
  addConstrucorIngredient,
  removeConstrucorIngredient,
  moveConstructorIngredient,
} from "../../services/reducers/burgerSlice";
import { v4 } from "uuid";
import { useDrop, useDrag } from "react-dnd";
import { ingredientType } from "../../utils/types";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: dragItemTypes.CONSTRUCTOR_LIST,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop({ _id, itsBun }) {
      if (itsBun) {
        dispatch(setBun(_id));
      } else {
        dispatch(
          addConstrucorIngredient({
            constructorId: v4(),
            ingredientId: _id,
          })
        );
      }
    },
  });
  return (
    <div ref={drop} className={styles.burgerParts}>
      <BunElem type="top" />

      <div className={styles.inredientList}>
        <IngredientList />
      </div>

      <BunElem type="bottom" />

      <OrderBtn />
    </div>
  );
};

const BunElem = ({ type }) => {
  const { ingredientData, selectedBunId } = useSelector((state) => ({
    ingredientData: state.burger.burgerIngredients,
    selectedBunId: state.burger.selectedBunId,
  }));

  const selectedBunElem = getBunElement(ingredientData, selectedBunId);

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

const IngredientList = () => {
  const { ingredientData, constructorIngedientsList } = useSelector(
    (state) => ({
      ingredientData: state.burger.burgerIngredients,
      constructorIngedientsList: state.burger.burgerConstructor,
    })
  );

  return (
    <>
      {constructorIngedientsList?.map((listElem, index) => {
        const constructorId = listElem.constructorId;
        const currentIngredient = ingredientData?.find(
          (ingredientElem) => ingredientElem._id === listElem._id
        );
        if (!currentIngredient)
          return <div key={constructorId}>ингридиент потерялся</div>;
        return (
          <Ingredient
            key={constructorId}
            index={index}
            constructorId={constructorId}
            ingredient={currentIngredient}
          />
        );
      })}
    </>
  );
};

const Ingredient = ({ constructorId, ingredient, index }) => {
  const dispatch = useDispatch();
  const dragRef = useRef(null);
  const dropRef = useRef(null);

  const [, drag, preview] = useDrag({
    type: dragItemTypes.CONSTRUCTOR_LIST_SORT,
    item: () => {
      return { constructorId: constructorId, index };
    },
  });

  const [, drop] = useDrop({
    accept: dragItemTypes.CONSTRUCTOR_LIST_SORT,
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (!dragRef.current) {
        return;
      }

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const indexDiff = Math.abs(hoverIndex - dragIndex);

      if (
        indexDiff <= 1 &&
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }
      if (
        indexDiff <= 1 &&
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }

      dispatch(moveConstructorIngredient({ dragIndex, hoverIndex }));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  drag(drop(dragRef));
  preview(drop(dropRef));

  return (
    <div className={styles.elementBox_dragable} ref={dropRef}>
      <div ref={dragRef} className={styles.elementBox_dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        draggable="false"
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch(removeConstrucorIngredient(constructorId));
        }}
      />
    </div>
  );
};

const OrderBtn = () => {
  const {
    ingredientData,
    constructorIngedientsList,
    selectedBunId,
    isModalOpen,
  } = useSelector((state) => ({
    ingredientData: state.burger.burgerIngredients,
    constructorIngedientsList: state.burger.burgerConstructor,
    selectedBunId: state.burger.selectedBunId,
    isModalOpen: Boolean(state.burger.orderDetails),
  }));

  const dispatch = useDispatch();

  const selectedBunElem = getBunElement(ingredientData, selectedBunId);

  const оrderSum = useMemo(
    () =>
      (constructorIngedientsList
        ? constructorIngedientsList.reduce((sumVal, listElem) => {
            const currentIngredient = ingredientData?.find(
              (ingredientElem) => ingredientElem._id === listElem._id
            );
            return sumVal + (currentIngredient ? currentIngredient.price : 0);
          }, 0)
        : 0) +
      (selectedBunElem ? selectedBunElem.price : 0) * 2,
    [selectedBunElem, constructorIngedientsList, ingredientData]
  );

  return (
    <>
      <div className={styles.orderBtn}>
        <div className={styles.orderBtn__totalBox}>
          <div
            className={styles.orderBtn__total + " text text_type_digits-medium"}
          >
            {оrderSum}
          </div>
          <div className={styles.orderBtn__ico}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={() => {
            constructorIngedientsList &&
              selectedBunId &&
              dispatch(
                fetchOrder([
                  selectedBunId,
                  ...constructorIngedientsList.map((val) => val._id),
                  selectedBunId,
                ])
              );
          }}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => {
          dispatch(cleanOrderDetails());
        }}
      >
        <OrderDetails />
      </Modal>
    </>
  );
};

const getBunElement = (ingredientData, currentBunId) =>
  ingredientData?.find((val) => val._id === currentBunId);

BunElem.propTypes = {
  type: PropTypes.string.isRequired,
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
  constructorId: PropTypes.string,
  index: PropTypes.number,
};

export default BurgerConstructor;
