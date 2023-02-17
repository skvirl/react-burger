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
    addBun(state, action) {
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
      state.orderDetails = {...state.orderDetails,...action.payload};
    },
  },
});

export default burgerSlice.reducer;

export const {
  setBurgerIngredients,
  addBun,
  addConstrucorIngredient,
  removeConstrucorIngredient,
  setIngredientDetails,
  cleanIngredientDetails,
  setOrderDetails,
} = burgerSlice.actions;
