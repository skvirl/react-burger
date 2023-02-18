import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import useModalController from "../../hooks/ModalController";
import OrderDetails from "../Modal/OrderDetails";
import { sendOrderData } from "../../utils/api";
import { dragItemTypes } from "../../utils/itemTypes";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  setBun,
  setOrderDetails,
  addConstrucorIngredient,
  removeConstrucorIngredient,
  moveConstructorIngredient,
} from "../../services/reducers/burgerSlice";
import { v4 } from "uuid";
import { useDrop, useDrag, DragPreviewImage } from "react-dnd";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [{ isHover }, drop] = useDrop({
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
      {constructorIngedientsList.map((listElem, index) => {
        const currentIngredient = ingredientData.find(
          (ingredientElem) => ingredientElem._id === listElem._id
        );
        if (!currentIngredient)
          return <div key={listElem.constructorId}>ингридиент потерялся</div>;
        return (
          <Ingredient
            key={listElem.constructorId}
            index={index}
            listElem={listElem}
            ingredient={currentIngredient}
          />
        );
      })}
    </>
  );
};

const Ingredient = ({ listElem, ingredient, index }) => {
  const dispatch = useDispatch();
  const dragRef = useRef(null);
  const dropRef = useRef(null);

  const [, drag, preview] = useDrag({
    type: dragItemTypes.CONSTRUCTOR_LIST_SORT,
    item: () => {
      return { constructorId: listElem.constructorId, index };
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
      <div ref={dragRef}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        draggable="false"
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch(removeConstrucorIngredient(listElem.constructorId));
        }}
      />
    </div>
  );
};

const OrderBtn = () => {
  const getOrderSum = (ingredientData, ingedientsList, selectedBunElem) => {
    const sum =
      ingedientsList.reduce((sumVal, listElem) => {
        const currentIngredient = ingredientData.find(
          (ingredientElem) => ingredientElem._id === listElem._id
        );
        return sumVal + (currentIngredient ? currentIngredient.price : 0);
      }, 0) +
      (selectedBunElem ? selectedBunElem.price : 0) * 2;

    return sum;
  };

  const { ingredientData, constructorIngedientsList, selectedBunId } =
    useSelector((state) => ({
      ingredientData: state.burger.burgerIngredients,
      constructorIngedientsList: state.burger.burgerConstructor,
      selectedBunId: state.burger.selectedBunId,
    }));

  const selectedBunElem = getBunElement(ingredientData, selectedBunId);

  const modalControl = useModalController();

  const оrderSum = getOrderSum(
    ingredientData,
    constructorIngedientsList,
    selectedBunElem
  );

  const dispatch = useDispatch();

  const { isLoaded, hasError, data, executeApiRequest } = useFetch(() =>
    sendOrderData([selectedBunId, ...constructorIngedientsList, selectedBunId])
  );

  useEffect(() => {
    dispatch(
      setOrderDetails({
        orderNumber: data?.order?.number,
        hasError: Boolean(isLoaded) && Boolean(hasError),
      })
    );
  }, [data, isLoaded, hasError]);

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
            dispatch(
              setOrderDetails({
                constructorIngedientsList,
                selectedBunId,
                оrderSum,
              })
            );
            executeApiRequest();
            modalControl.openModal();
          }}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={modalControl.isModalOpen}
        closeModal={modalControl.closeModal}
      >
        <OrderDetails />
      </Modal>
    </>
  );
};

const getBunElement = (ingredientData, currentBunId) =>
  ingredientData.find((val) => val._id === currentBunId);

BunElem.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerConstructor;
