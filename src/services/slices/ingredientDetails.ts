import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientDetails: null,
};

const burgerSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails(state, action) {
      state.ingredientDetails = action.payload;
    },
    cleanIngredientDetails(state, action) {
      state.ingredientDetails = null;
    },
  },
});

export default burgerSlice.reducer;

export const {
  setIngredientDetails,
  cleanIngredientDetails,
} = burgerSlice.actions;
