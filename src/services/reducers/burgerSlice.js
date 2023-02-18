import { createSlice } from "@reduxjs/toolkit";
import { initialConstructorIngredientData } from "../../utils/data";

const initialState = {
  burgerIngredients: [],
  burgerConstructor: initialConstructorIngredientData.ingredients,
  selectedBunId: initialConstructorIngredientData.selectedBunId,
  ingredientDetails: {},
  orderDetails: {},
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    setBurgerIngredients(state, action) {
      state.burgerIngredients = action.payload;
    },
    setBun(state, action) {
      state.selectedBunId = action.payload;
    },
    addConstrucorIngredient(state, action) {
      state.burgerConstructor = [
        ...state.burgerConstructor,
        {
          constructorId: action.payload.constructorId,
          _id: action.payload.ingredientId,
        },
      ];
    },
    moveConstructorIngredient(state, action) {
      const {dragIndex, hoverIndex}= action.payload;
 
      const movingElement = state.burgerConstructor[dragIndex];
      state.burgerConstructor.splice(dragIndex, 1);
      state.burgerConstructor.splice(
        hoverIndex,
        0,
        movingElement
      );
    },
    removeConstrucorIngredient(state, action) {
      state.burgerConstructor = state.burgerConstructor.filter(
        (val) => val.constructorId !== action.payload
      );
    },

    setIngredientDetails(state, action) {
      state.ingredientDetails = action.payload;
    },
    cleanIngredientDetails(state, action) {
      state.ingredientDetails = null;
    },

    setOrderDetails(state, action) {
      state.orderDetails = { ...state.orderDetails, ...action.payload };
    },
  },
});

export default burgerSlice.reducer;

export const {
  setBurgerIngredients,
  setBun,
  addConstrucorIngredient,
  moveConstructorIngredient,
  removeConstrucorIngredient,
  setIngredientDetails,
  cleanIngredientDetails,
  setOrderDetails,
} = burgerSlice.actions;
