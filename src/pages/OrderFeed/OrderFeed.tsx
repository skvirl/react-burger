import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderFeed.module.css";
import { FC, useMemo } from "react";
import { cachedOrderFeed } from "../../utils/data";
import { RootState } from "../../services/store";
import { useAppSelector } from "../../hooks/redux";

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

  const getStoreData = (state: RootState) => ({
    ingredientData: state.burgerIngredients.burgerIngredients,
  });
  const { ingredientData, } = useAppSelector(getStoreData);

  const groupedIngedients = useMemo(
    () => {
      if (!ingredients || !ingredientData) return [];

      return ingredients
        .reduce((unicCardIngredients: Array<{ _id: string, groupCounter: number }>, CardIngredient) => {

          const unicIngredient = unicCardIngredients.find(currentUnicIngredient => currentUnicIngredient._id === CardIngredient);

          if (unicIngredient === undefined) {
            unicCardIngredients.push({ _id: CardIngredient, groupCounter: 1 });
          } else {
            unicIngredient.groupCounter++;
          };

          return unicCardIngredients;
        }, [])

        .map(CardIngredient => {
          const ingredientDataElement = ingredientData.find(ingredientDataElement => CardIngredient._id === ingredientDataElement._id)
          return ingredientDataElement === undefined ?
            { image: '', groupCounter: CardIngredient.groupCounter, alt: '' } :
            { image: ingredientDataElement.image_mobile, groupCounter: CardIngredient.groupCounter, name: ingredientDataElement.name }
        }
        )

        .map(viewObject => (
        <div className={styles.card__Placeholder}>
          <div className={styles.card__PictureBorder} />
          <img className={styles.card__Picture} src={viewObject.image} alt={viewObject.name} />
        </div>
        ))

    },
    [ingredientData, ingredients]
  );


  return (
    <div className={styles.card}>
      <div className={styles.card__Wrapper}>
        <div className={`${styles.topPanel}`}>
          <div
            className={`text text_type_digits-default  `}
          >{`#${number}`}</div>
          <div
            className={`text text_type_main-default text_color_inactive  ${styles.card__CreatedAt}`}
          >
            {createdAt}
          </div>
        </div>
        <div className={`text text_type_main-medium   ${styles.card__Name}`}>
          {name}
        </div>
        <div className={`  ${styles.card__bottomPanel}`}>
          <div className={styles.card__Ingredients}>
            {groupedIngedients}

          </div>
          <div className={`text text_type_digits-default  ${styles.card__Price}`}>
            <CurrencyIcon type="primary" />
            480
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFeed;
