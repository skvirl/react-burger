import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderFeed.module.css";
import { FC } from "react";
import { cachedOrderFeed } from "../../utils/data";

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

type TCardData = {
  number: number;
  ingredients: string[];
  name: string;
  createdAt: string;
};

const OrdersList: FC = () => {
  return (
    <>
      {cachedOrderFeed.orders.map((val) => (
        <CardOrder cardData={val} />
      ))}
    </>
  );
};

const CardOrder: FC<{
  cardData: TCardData;
}> = ({ cardData }) => {
  const { number, ingredients, name, createdAt } = cardData;

  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={`${styles.topPanel}`}>
          <div
            className={`text text_type_digits-default ${styles.cardNumber}`}
          >{`#${number}`}</div>
          <div
            className={`text text_type_main-default text_color_inactive  ${styles.cardCreatedAt}`}
          >
            {createdAt}
          </div>
        </div>
        <div className={`text text_type_main-medium   ${styles.cardName}`}>
          {name}
        </div>
        <div className={`  ${styles.bottomPanel}`}>
          <div className={styles.cardIngredients}> 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧</div>
          <div className={`text text_type_digits-default  ${styles.cardPrice}`}>
            <CurrencyIcon type="primary" />
            480
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFeed;
