import OrdersList from "../../components/OrderList/OrderList";
import styles from "./ProfileOrders.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react"
import { RootState } from "../../services/store";
import { LoaderSpinner } from "../../components/LoaderSpinner/LoaderSpinner";

const ProfileOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: 'socket/connect' });
    return () => {
      dispatch({ type: 'socket/disconnect' })
    }
  }, []);
  const getStoreData = (state: RootState) => state.orderFeed.success;
  const feedSuccess = useAppSelector(getStoreData);

  return (<div className={styles.profileOrdersContainer}>
    {
      feedSuccess ?
        <OrdersList showStatus={true} /> :
        <div className={styles.spinner}><LoaderSpinner /></div>
    }
  </div>)
};
export default ProfileOrders;
