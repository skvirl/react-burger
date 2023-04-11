import styles from "./OrdersStatistic.module.css";
import { FC, useMemo } from "react";
import { RootState } from "../../services/store";
import { useAppSelector } from "../../hooks/redux";

const OrdersStatistic: FC = () => {

    const getStoreData = (state: RootState) => ({
        orders: state.orderFeed.orders,
        total: state.orderFeed.total ? state.orderFeed.total : 0,
        totalToday: state.orderFeed.totalToday ? state.orderFeed.totalToday : 0,
    });

    const { orders, total, totalToday } = useAppSelector(getStoreData);
    const ordersReady = useMemo(() => orders ? orders.filter(val => val.status === 'Выполнен').map(val => (<div key={val._id}>{val.number}</div>)) : [], [orders])
    const ordersWait = useMemo(() => orders ? orders.filter(val => val.status === 'Готовится').map(val => (<div key={val._id}>{val.number}</div>)) : [], [orders])
 
    return (
        <>
            <div className={styles.container}>
                <div className={styles.OrderLists__Wrapper}>
                    <div className={styles.OrderLists__OrderLists}>
                        <span className={`text text_type_main-medium`}>
                            Готовы:
                        </span>
                        <div className={styles.OrderLists__ReadyList} >
                            <div className={`text text_type_digits-default mr-4  ${styles.total__col}`}>
                                {ordersReady.splice(0, 10)}
                            </div>
                            <div className={`text text_type_digits-default  ${styles.total__col}`}>
                                {ordersReady.splice(0, 10)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.OrderLists__OrderLists}>
                        <span className={`text text_type_main-medium `}>
                            В работе:
                        </span>
                        <div className={styles.OrderLists__WaitList} >

                            <div className={`text text_type_digits-default mr-4 ${styles.total__col}`}>
                                {ordersWait.splice(0, 10)}
                            </div>
                            <div className={`text text_type_digits-default  ${styles.total__col}`}>
                                {ordersWait.splice(0, 10)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.total__wrapper}>
                    <div className={`text text_type_main-medium  `}>
                        Выполнено за все время:
                    </div>
                    <div className={`text text_type_digits-large ${styles.total__glow}`}>
                        {total.toLocaleString()}
                    </div>
                </div>
                <div className={styles.total__wrapper}>
                        <div className={`text text_type_main-medium  `}>
                            Выполнено за сегодня:
                        </div>
                        <div className={`text text_type_digits-large ${styles.total__glow}`}>
                            {totalToday.toLocaleString()}
                        </div>

                </div>
            </div>
        </>
    );
};

export default OrdersStatistic;