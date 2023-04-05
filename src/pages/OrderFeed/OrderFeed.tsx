import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderFeed.module.css";
import { FC } from "react";
import { cachedOrderFeed } from "../../utils/data";

const OrderFeed: FC = () => {
  const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
  ws.onmessage = (event) => {
    console.log(event)
  }
  return (
    <>

      <main className={styles.main}>

        <div className={styles.container}>
          <span className={`text text_type_main-large ${styles.main_title}`} >Лента заказов</span>

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
  _id: string,
  ingredients: string[],
  name: string,
  createdAt: string
};

const OrdersList: FC = () => {
  return (<>{cachedOrderFeed.orders.map((val) => <CardOrder cardData={val} />)}</>);
}

const CardOrder: FC<{
  cardData: TCardData,


}> = ({ cardData }) => {
  const { _id, ingredients, name, createdAt } = cardData;

  return (<div>
    <div  >
      <div className={styles.mainSection}>
          {`#${_id}`}
      </div>
      <div>
        {createdAt}
      </div>
    </div>
    <div>

    </div>
    <div>
      <div>

      </div>
      <div>

      </div>
    </div>
  </div>)

}

export default OrderFeed;


