import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientsApiUrl, request } from "../../utils/api";

const initialState = {
  burgerIngredients: null,
  burgerIngredientsLoadingError: null,
};

export const fetchBurgerIngredients = createAsyncThunk(
  "burger/fetchBurgerIngredients",

  async function (_, { rejectWithValue }) {
    try {
      return (await request(ingredientsApiUrl)).data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const burgerSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state, action) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
        state.burgerIngredients = action.payload;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.rejected, (state, action) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = action.payload;
      });
  },
});

export default burgerSlice.reducer;
