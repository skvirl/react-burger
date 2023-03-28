import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
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

type TBurgerIngredients = null | Array<TBurgerIngredient>;

type TInitialState = {
  burgerIngredients: TBurgerIngredients;
  burgerIngredientsLoadingError: string | null | unknown;
};

export type TBurgerIngredientsSlice = { burgerIngredients: TInitialState };

const initialState: TInitialState = {
  burgerIngredients: null,
  burgerIngredientsLoadingError: null,
};

export const fetchBurgerIngredients =
  createAsyncThunk(
    "burger/fetchBurgerIngredients",

    async function (_, { rejectWithValue },):Promise<TBurgerIngredients|unknown> {
      try {
        return (
          await request(ingredientsApiUrl).catch((err) => {
            throw err;
          })
        ).data;
      } catch (error: unknown) {
        if ( error instanceof Error && "message" in error) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

const burgerSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
        state.burgerIngredients = action.payload as TBurgerIngredients;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.rejected, (state, action) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = String(action.payload);
      });
  },
});

export default burgerSlice.reducer;
