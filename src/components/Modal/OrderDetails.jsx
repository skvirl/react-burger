import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./OrderDetails.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = ({ orderNumber }) => {
  return (

      <div className={styles.orderDetails}>
        <div className={`text text_type_digits-large `+styles.orderDetails__orderNumber}>{orderNumber}</div>
        <div className={` `+styles.text1}>идентификатор заказа</div>
        <div  className={styles.image}></div>
        <div className={`text text_type_main-small `+styles.text2}>Ваш заказ начали готовить</div>
        <div className={`text text_type_main-small text_color_inactive `+styles.text3}>
          Дождитесь готовности на орбитальной станции
        </div>
      </div>
    )
};

export default OrderDetails;