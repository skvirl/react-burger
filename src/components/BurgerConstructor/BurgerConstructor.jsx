import {useEffect} from  "react";
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
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import {setOrderDetails} from '../../services/reducers/burgerSlice'
const BurgerConstructor = () => {
 
  return (
    <div className={styles.burgerParts}>
      <BunElem type="top"/>

      <div className={styles.inredientList}>
        <IngredientList />
      </div>

      <BunElem type="bottom" />

      <OrderBtn />
    </div>
  );
};

const BunElem = ({ type }) => {

  const {ingredientData,selectedBunId} = useSelector(state => ({
    ingredientData:state.burger.burgerIngredients,
    selectedBunId:state.burger.selectedBunId
  }));

  const selectedBunElem = getBunElement(
    ingredientData,
    selectedBunId
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


const IngredientList = () => {

  const {ingredientData,constructorIngedientsList} = useSelector(state => ({
    ingredientData:state.burger.burgerIngredients,
    constructorIngedientsList:state.burger.burgerConstructor
  }));
  
  return (
    <>
      {constructorIngedientsList.map((listElem) => {
        const currentIngredient = ingredientData.find(
          (ingredientElem) => ingredientElem._id === listElem._id
        );
        if (!currentIngredient) return <div key={listElem.constructorId} >ингридиент потерялся</div>;
        return (
          <div
            className={styles.elementBox_dragable}
            key={listElem.constructorId}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={currentIngredient.name}
              price={currentIngredient.price}
              thumbnail={currentIngredient.image}
            />
          </div>
        );
      })}
    </>
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
  
  const {ingredientData,constructorIngedientsList,selectedBunId} = useSelector(state => ({
    ingredientData:state.burger.burgerIngredients,
    constructorIngedientsList:state.burger.burgerConstructor,
    selectedBunId:state.burger.selectedBunId
  }));

  const selectedBunElem = getBunElement(
    ingredientData,
    selectedBunId
  );
    
  const modalControl = useModalController();
  
  const оrderSum = getOrderSum(
    ingredientData,
    constructorIngedientsList,
    selectedBunElem
  );

  const dispatch = useDispatch();  

  const { isLoaded, hasError, data, executeApiRequest } = useFetch(() =>
    sendOrderData([
      selectedBunId,
      ...constructorIngedientsList,
      selectedBunId,
    ])
  );

  useEffect(() => {
    dispatch(setOrderDetails({
      orderNumber:data?.order?.number,
      hasError: Boolean(isLoaded) && Boolean(hasError)
    }));
  }, [data,isLoaded,hasError]);

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
            dispatch(setOrderDetails({
              constructorIngedientsList,
              selectedBunId,
              оrderSum,
            }));
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
        <OrderDetails/>
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
