import { useMemo } from "react";
import styles from "./OrderBtn.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  fetchOrder,
  cleanOrderDetails,
} from "../../services/slices/orderDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";

const OrderBtn = () => {

  const getStoreData = (state: RootState) => ({
    ingredientData: state.burgerIngredients.burgerIngredients,
    constructorIngedientsList: state.burgerConstructor.burgerConstructor,
    selectedBunId: state.burgerConstructor.selectedBunId,
  });
  const {
    ingredientData,
    constructorIngedientsList,
    selectedBunId,
  } = useAppSelector(getStoreData);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
              navigate(`order-details`, {
                state: { background: location },
              });

            } else {
              dispatch(cleanOrderDetails(undefined));
            }
          }}
          data-cy="createOrder"
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default OrderBtn;
