import styles from "./OrderDetails.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const OrderDetails = ({ modalUse }) => {
  const { orderNumber, hasError } = useSelector((state) => ({
    orderNumber: state.orderDetails.orderNumber,
    hasError: state.orderDetails.orderDetailsLoadingError,
  }));

  const noData = !modalUse && !orderNumber && !hasError;

  return noData ? (
    <Navigate to="/" replace />
  ) : (
    <>
      {hasError ? (
        <div
          className={`${styles.orderDetails} ${
            modalUse ? styles.orderDetails_modal : styles.orderDetails_page
          }`}
        >
          <div
            className={`text text_type_main-medium ` + styles.text_errorHeader}
          >
            Ничего не вышло. Попробуйте повторить заказ чуть позже.
          </div>
          <div
            className={
              `text text_type_main-small text_color_inactive ` + styles.text3
            }
          >
            {hasError}
          </div>

          <div className={styles.image}></div>
        </div>
      ) : (
        <div
          className={`${styles.orderDetails} ${
            modalUse ? styles.orderDetails_modal : styles.orderDetails_page
          }`}
        >
          <div
            className={
              `text text_type_digits-large ` + styles.orderDetails__orderNumber
            }
          >
            {orderNumber}
          </div>
          <div className={`text text_type_main-medium ` + styles.text1}>
            идентификатор заказа
          </div>
          <div className={styles.image}></div>
          <div className={`text text_type_main-small ` + styles.text2}>
            Ваш заказ начали готовить
          </div>
          <div
            className={
              `text text_type_main-small text_color_inactive ` + styles.text3
            }
          >
            Дождитесь готовности на орбитальной станции
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;

OrderDetails.propTypes = {
  modalUse: PropTypes.bool,
};