import { useParams } from "react-router-dom";
import { RootState } from "../../services/store";
import { useAppSelector } from "../../hooks/redux";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../hooks/redux";
import groupFeedIngredients from "../../utils/groupFeedIngredients";
import styles from "./OrderFeedDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LoaderSpinner } from "../../components/LoaderSpinner/LoaderSpinner";
import { WS_UserOrdersUrl } from "../../utils/api";
import { getCookie } from "../../utils/cookies";

const OrderFeedDetails = () => {
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

  const _id = useParams()?.id;
  const getStoreData = (state: RootState) => ({
    order: state.orderFeed.orders?.find((val) => val._id === _id),
    ingredientData: state.burgerIngredients.burgerIngredients,
    feedSuccess: state.orderFeed.success,
  });

  const { order, ingredientData, feedSuccess } = useAppSelector(getStoreData);

  const groupedIngedients = useMemo(
    () => groupFeedIngredients(order ? order.ingredients : [], ingredientData),
    [ingredientData, order?.ingredients]
  );

  const total = useMemo(
    () =>
      groupedIngedients.reduce(
        (prev, val) => prev + (val.price ? val.price : 0) * val.groupCounter,
        0
      ),
    [groupedIngedients]
  );

  const dataTransform = (strCardDate: string | undefined) => {
    if (!strCardDate) return "";

    const cardDateFull = new Date(strCardDate);
    const currDateFull = new Date();

    const cardDate = new Date(
      cardDateFull.getFullYear(),
      cardDateFull.getMonth(),
      cardDateFull.getDate()
    );
    const currDate = new Date(
      currDateFull.getFullYear(),
      currDateFull.getMonth(),
      currDateFull.getDate()
    );

    const dayDiff =
      (currDate.getTime() - cardDate.getTime()) / (1000 * 3600 * 24);

    const timeStr = cardDateFull.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (dayDiff > 7) return `ранее недели назад, ${timeStr}`;
    if (dayDiff > 1)
      return `${dayDiff} ${dayDiff > 4 ? "дней" : "дня"} назад, ${timeStr}`;
    if (dayDiff === 1) return `Вчера, ${timeStr}`;
    if (dayDiff === 0) return `Сегодня, ${timeStr}`;
  };

  const groupedIngedientsView = useMemo(
    () =>
      groupedIngedients.map((ingredient) => (
        <div key={ingredient._id} className={` mt-4 ${styles.ingredient}`}>
          <div
            className={`text text_type_main-default ${styles.leftIngredientRow} `}
          >
            <div className={styles.image}>
              <div key={ingredient._id} className={`${styles.imgContainer} `}>
                <div>
                  <picture className={styles.picture}>
                    <source srcSet={ingredient.image} />
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      width="112"
                      height="56"
                    />
                  </picture>
                </div>
              </div>
            </div>

            <div className="ml-4">{ingredient.name}</div>
          </div>

          <div className={styles.rightIngredientRow}>
            <div className="text text_type_digits-default">
              {ingredient.groupCounter}
            </div>
            <div className="text text_type_main-default ml-2">x</div>
            <div className="text text_type_digits-default ml-2">
              {ingredient.price}
            </div>
            <div className={` ml-2 ${styles.currency} `}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )),
    [groupedIngedients]
  );

  return (
    <div className={styles.container}>
      {feedSuccess ? (
        <div className={styles.order}>
          <div className={` text text_type_digits-default ${styles.number}`}>
            #{order?.number}
          </div>
          <div className={`text text_type_main-medium mt-10  `}>
            {order?.name}
          </div>

          <div
            className={`text text_type_main-small mt-3 ${
              order?.status === "Выполнен" ? styles.status_done : ""
            }`}
          >
            {order?.status}
          </div>
          <div className={`text text_type_main-medium mt-15  `}>Состав:</div>
          <div className={` mt-6 ${styles.ingredients}`}>
            {groupedIngedientsView}
          </div>

          <div className={` mt-10 ${styles.footer}`}>
            <div
              className={` text text_type_main-default text_color_inactive  `}
            >
              {dataTransform(order?.updatedAt)}
            </div>
            <div className={styles.total}>
              <div className="text text_type_digits-default">{total}</div>
              <div className="ml-2">
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.spinner}>
          <LoaderSpinner />
        </div>
      )}
    </div>
  );
};
export default OrderFeedDetails;
