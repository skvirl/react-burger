import React from "react";
import { v4} from 'uuid';

export const ConstructorIngredientsContext = React.createContext();
export const IngredientsDataContext = React.createContext();

export const constructorIngredientsReducer = (state, action) => {
  switch (action.type) {
    case "addBun":
      return { ...state, bunId: action.ingredientId };
    case "removeBun":
      return { ...state, bunId: null };
    case "addIngredient":
      return {
        ...state,
        ingredients: [...state.ingredients, {constructorId:v4() ,_id:action.ingredientId}],
      };
    case "removeIngredient":
      return {
        ...state,
        ingredients: state.ingredients.filter((val) => val.constructorId !== action.constructorId),
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};


