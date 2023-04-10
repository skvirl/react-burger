import styles from "./OrderFeed.module.css";
import { FC, useEffect } from "react";
import OrdersList from "../../components/OrderList/OrderList";
import OrdersStatistic from "../../components/OrdersStatistic/OrdersStatistic";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";
import { LoaderSpinner } from "../../components/LoaderSpinner/LoaderSpinner";
import { WS_OrdersUrl } from "../../utils/api";

const OrderFeed: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: "socket/connect",
      payload: { wsUrl: String(WS_OrdersUrl) },
    });
    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, []);

  const getStoreData = (state: RootState) => state.orderFeed.success;
  const feedSuccess = useAppSelector(getStoreData);

  return feedSuccess ? (
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
              <OrdersStatistic />
            </section>
          </div>
        </div>
      </main>
    </>
  ) : (
    <div className={styles.spinner}>
      <LoaderSpinner />
    </div>
  );
};

export default OrderFeed;
