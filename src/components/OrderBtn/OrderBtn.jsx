import { useMemo } from "react";
import styles from "./OrderBtn.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrder,
  cleanOrderDetails,
} from "../../services/slices/orderDetails";

const OrderBtn = () => {
    const {
      ingredientData,
      constructorIngedientsList,
      selectedBunId,
      isModalOpen,
      orderDetailsLoadingError,
    } = useSelector((state) => ({
      ingredientData: state.burgerIngredients.burgerIngredients,
      constructorIngedientsList: state.burgerConstructor.burgerConstructor,
      selectedBunId: state.burgerConstructor.selectedBunId,
      isModalOpen: Boolean(state.orderDetails.orderNumber),
      orderDetailsLoadingError: state.orderDetails.orderDetailsLoadingError,
    }));
  
    const dispatch = useDispatch();
  
    const selectedBunElem = useMemo(
      () => ingredientData?.find((val) => val._id === selectedBunId),
      [ingredientData, selectedBunId]
    );
    
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
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => {
              if (selectedBunId && constructorIngedientsList?.length) {
                dispatch(
                  fetchOrder([
                    selectedBunId,
                    ...constructorIngedientsList.map((val) => val._id),
                    selectedBunId,
                  ])
                );
              } else {
                dispatch(cleanOrderDetails());
              }
            }}
          >
            Оформить заказ
          </Button>
        </div>
        <Modal
          isOpen={isModalOpen || Boolean(orderDetailsLoadingError)}
          closeModal={() => {
            dispatch(cleanOrderDetails());
          }}
        >
          <OrderDetails />
        </Modal>
      </>
    );
  };
  
  export default OrderBtn;
