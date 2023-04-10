import OrdersList from "../../components/OrderList/OrderList";
import styles from "./ProfileOrders.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { RootState } from "../../services/store";
import { LoaderSpinner } from "../../components/LoaderSpinner/LoaderSpinner";
import { WS_UserOrdersUrl } from "../../utils/api";
import { getCookie } from "../../utils/cookies";

const ProfileOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    accessToken && WS_UserOrdersUrl.searchParams.set("token", accessToken);

    dispatch({
      type: "socket/connect",
      payload: { wsUrl: String(WS_UserOrdersUrl) },
    });
    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, []);

  const getStoreData = (state: RootState) => state.orderFeed.success;
  const feedSuccess = useAppSelector(getStoreData);

  return (
    <div className={styles.profileOrdersContainer}>
      {feedSuccess ? (
        <OrdersList showStatus={true} />
      ) : (
        <div className={styles.spinner}>
          <LoaderSpinner />
        </div>
      )}
    </div>
  );
};
export default ProfileOrders;
