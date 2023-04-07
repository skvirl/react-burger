import styles from "./OrderFeed.module.css";
import { FC } from "react";
import OrdersList from "../../components/OrderList/OrderList";

const OrderFeed: FC = () => {
  const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
  ws.onmessage = (event) => {
    console.log(event);
  };
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <span className={`text text_type_main-large ${styles.main_title}`}>
            Лента заказов
          </span>

          <div className={styles.wrapper}>
            <section className={styles.mainSection}>
              <OrdersList />
            </section>
            <section className={styles.mainSection}>
              <span className="text text_type_digits-large"> 🚧</span>
              <span className="text text_type_digits-medium">
                under construction
              </span>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderFeed;
