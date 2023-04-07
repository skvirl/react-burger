import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderList.module.css";
import { FC, useMemo } from "react";
import { cachedOrderFeed } from "../../utils/data";
import { RootState } from "../../services/store";
import { useAppSelector } from "../../hooks/redux";

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
  const { ingredientData } = useAppSelector(getStoreData);

  const groupedIngedients = useMemo(() => {
    if (!ingredients || !ingredientData) return [];

    return ingredients
      .reduce(
        (
          unicCardIngredients: Array<{ _id: string; groupCounter: number }>,
          CardIngredient
        ) => {
          const unicIngredient = unicCardIngredients.find(
            (currentUnicIngredient) =>
              currentUnicIngredient._id === CardIngredient
          );

          if (unicIngredient === undefined) {
            unicCardIngredients.push({ _id: CardIngredient, groupCounter: 1 });
          } else {
            unicIngredient.groupCounter++;
          }

          return unicCardIngredients;
        },
        []
      )

      .map((CardIngredient) => {
        const ingredientDataElement = ingredientData.find(
          (ingredientDataElement) =>
            CardIngredient._id === ingredientDataElement._id
        );
        return ingredientDataElement === undefined
          ? { image: "", groupCounter: CardIngredient.groupCounter, alt: "" }
          : {
              image: ingredientDataElement.image_mobile,
              groupCounter: CardIngredient.groupCounter,
              name: ingredientDataElement.name,
            };
      })

      .map((viewObject) => (
        <div className={styles.card__ImgContainer}>
          <img src={viewObject.image} alt={viewObject.name} />
        </div>
      ));
  }, [ingredientData, ingredients]);

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
          <div className={styles.card__Ingredients}>{groupedIngedients}</div>
          <div
            className={`text text_type_digits-default   ${styles.card__Price}`}
          >
            <CurrencyIcon type="primary" />
            <div className={styles.card__PriceNum}>480</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
