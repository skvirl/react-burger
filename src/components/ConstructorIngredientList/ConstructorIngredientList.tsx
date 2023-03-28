import  ConstructorIngredient  from "../ConstructorIngredient/ConstructorIngredient";
import { useAppSelector } from "../../hooks/redux";
const ConstructorIngredientList = () => {
  const { ingredientData, constructorIngedientsList } = useAppSelector(
    (state) => ({
      ingredientData: state.burgerIngredients.burgerIngredients,
      constructorIngedientsList: state.burgerConstructor.burgerConstructor,
    })
  );

  return (
    <>
      {constructorIngedientsList?.map((listElem, index) => {
        const constructorId = listElem.constructorId;
        const currentIngredient = ingredientData?.find(
          (ingredientElem) => ingredientElem._id === listElem._id
        );
        if (!currentIngredient)
          return <div key={constructorId}>ингридиент потерялся</div>;
        return (
          <ConstructorIngredient
            key={constructorId}
            index={index}
            constructorId={constructorId}
            ingredient={currentIngredient}
          />
        );
      })}
    </>
  );
};

export default ConstructorIngredientList;
