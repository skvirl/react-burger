import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderFeed.module.css";

const OrderFeed = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.mainSection}>
            <h1 className="text text_type_digits-medium">Лента заказов</h1>
          </section>
          <section className={styles.mainSection}>
            <span className="text text_type_digits-large"> 🚧</span>
            <span className="text text_type_digits-medium">
              under construction
            </span>
          </section>
        </div>
      </main>
    </>
  );
};
export default OrderFeed;
