import { TBurgerIngredients } from "../services/slices/burgerIngredients";  

type TGroupFeedIngredients = {
  image: string,
  price: number,
  groupCounter: number,
  name: string,
  _id: string,
  type: string 
}[];

const groupFeedIngredients = (ingredients:string[],ingredientData:TBurgerIngredients):TGroupFeedIngredients => {
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
          ? { 
            image: "",
            price: 0,
            groupCounter: CardIngredient.groupCounter,
            name: "",
            _id: CardIngredient._id,
            type: '' 

           }
          : {
            image: ingredientDataElement.image_mobile,
            price: ingredientDataElement.price,
            groupCounter: CardIngredient.groupCounter,
            name: ingredientDataElement.name,
            _id: CardIngredient._id,
            type: ingredientDataElement.type 

          };
      })
  
  }

  export default groupFeedIngredients;