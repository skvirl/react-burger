import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { ingredientsApiUrl, request } from "../../utils/api";

type TBurgerIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

type TInitialState = {
  burgerIngredients: null | Array<TBurgerIngredient>;
  burgerIngredientsLoadingError: string|null|unknown;
};

const initialState: TInitialState = {
  burgerIngredients: null,
  burgerIngredientsLoadingError: null,
};

export const fetchBurgerIngredients:any = createAsyncThunk(
  "burger/fetchBurgerIngredients",

  async function (_, { rejectWithValue }) {
    try {
      return (
        await request(ingredientsApiUrl).catch((err) => {throw err})
      ).data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const burgerSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state, _action) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
        state.burgerIngredients = action.payload;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.rejected, (state, action) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = String(action.payload);
      });
  },
});

export default burgerSlice.reducer;
