import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderList.module.css";
import { FC, useMemo, useEffect } from "react";
import { RootState } from "../../services/store";
import { useAppSelector } from "../../hooks/redux";
import groupFeedIngredients from "../../utils/groupFeedIngredients";
import { TOrder } from "../../types/TOrderFeed";
import { useLocation, useNavigate } from "react-router-dom";

const OrdersList: FC<{ showStatus?: boolean }> = ({ showStatus = false }) => {
  const getStoreData = (state: RootState) => state.orderFeed.orders;

  const orders = useAppSelector(getStoreData);

  return (
    <div className={styles.orderList}>
      {orders &&
        orders.map((val) => (
          <CardOrder cardData={val} key={val._id} showStatus={showStatus} />
        ))}
    </div>
  );
};

const CardOrder: FC<{
  cardData: TOrder;
  showStatus: boolean;
}> = ({ cardData, showStatus = false }) => {
  const { number, ingredients, name, createdAt, status, _id } = cardData;

  const getStoreData = (state: RootState) => ({
    ingredientData: state.burgerIngredients.burgerIngredients,
  });

  const { ingredientData } = useAppSelector(getStoreData);

  const groupedIngedients = useMemo(
    () => groupFeedIngredients(ingredients, ingredientData),
    [ingredientData, ingredients]
  );

  const groupedImages = useMemo(
    () =>
      groupedIngedients.map((viewObject) => (
        <div
          key={viewObject._id}
          className={`${styles.imgContainer} ${styles.items_picture}`}
        >
          <div>
            <picture className={styles.picture}>
              <source srcSet={viewObject.image} />
              <img
                src={viewObject.image}
                alt={viewObject.name}
                width="112"
                height="56"
              />
            </picture>
            {viewObject.groupCounter > 1 && (
              <div
                className={`${styles.imgContainer}  ${styles.picture} ${styles.overflow}`}
              >
                <div className={`${styles.picture} text text_type_main-small`}>
                  +{viewObject.groupCounter}
                </div>
              </div>
            )}
          </div>
        </div>
      )),
    [groupedIngedients]
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

  const location = useLocation();
  const navigate = useNavigate();

  let pathname = location.pathname;
  
  // pathname = ~pathname.indexOf("/orders") ? "/orders" : pathname;

  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate(`${pathname}/${_id}`, {
          state: { background: location },
        });
      }}
    >
      <div className={styles.card__Wrapper}>
        <div className={`${styles.topPanel}`}>
          <div
            className={`text text_type_digits-default  `}
          >{`#${number}`}</div>
          <div
            className={`text text_type_main-default text_color_inactive  ${styles.card__CreatedAt}`}
          >
            {dataTransform(createdAt)}
          </div>
        </div>
        <div className={`text text_type_main-medium   ${styles.card__name}`}>
          {name}
        </div>
        {showStatus && (
          <div
            className={`text text_type_main-small 
          ${styles.card__status}
          ${status === "Выполнен" && styles.card__status_complete}`}
          >
            {status}
          </div>
        )}
        <div className={styles.card__bottomPanel}>
          <div className={styles.items_list}>{groupedImages}</div>

          <div
            className={`text text_type_digits-default ${styles.card__Price}`}
          >
            <CurrencyIcon type="primary" />
            <div className={styles.card__PriceNum}>{total}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
