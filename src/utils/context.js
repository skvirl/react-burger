import React from "react";

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
        ingredients: [...state.ingredients, action.ingredientId],
      };
    case "removeIngredient":
      let firstFound = false;
      return {
        ...state,
        ingredients: state.ingredients.filter((val) => {
          const result = (val !== action.ingredientId) || firstFound;
          if (!result) {firstFound = true}
          return (result);
        }),
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};
