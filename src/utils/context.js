import React from "react";

export const ConstructorIngredientsContext = React.createContext();
export const IngredientsDataContext = React.createContext();


export const constructorIngredientsReducer =   (state, action) => {
    switch (action.type) {
      case "addBun":
        return { ...state, bunId:action.ingredientId };
      case "removeBun":
        return { ...state, bunId:null };
      case "addIngredient":
         state.ingredients.push(action.ingredientId)   
        return { ...state };
      case "removeIngredient":
        const  existingIngredientIndex = state.ingredients.findIndex((val) => val === action.ingredientId )  
        if(existingIngredientIndex>=0) state.ingredients.splice(existingIngredientIndex,1);  
        return { ...state };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
