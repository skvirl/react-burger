import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";


const ConstructorIngredientList = () => {
  
  const getStoreData = (state: RootState) => ({
    ingredientData: state.burgerIngredients.burgerIngredients,
    constructorIngedientsList: state.burgerConstructor.burgerConstructor,
  });

  const { ingredientData, constructorIngedientsList } = useAppSelector(getStoreData);

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
