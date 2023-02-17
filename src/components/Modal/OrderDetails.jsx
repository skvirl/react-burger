import styles from "./OrderDetails.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux"; 

const OrderDetails = () => {
  console.log(useSelector(state => state.burger.orderDetails));
  const {orderNumber,hasError} = useSelector(state => state.burger.orderDetails);
  
  return (
    <>
    
      {  hasError ? (
        <div className={styles.orderDetails}>
          <div className={`text text_type_main-medium ` + styles.text1}>
            Ничего не вышло. Попробуйте повторить заказ чуть позже.
          </div>
          <div className={styles.image}></div>
        </div>
      ) : (
        <div className={styles.orderDetails}>
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
