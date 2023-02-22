import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialConstructorIngredientData } from "../../utils/data";
import { ingredientsApiUrl, orderApiUrl } from "../../utils/api";

const initialState = {
  burgerIngredients: null,
  burgerIngredientsLoadingError: null,
  burgerConstructor: null,
  selectedBunId: null,
  // burgerConstructor: initialConstructorIngredientData.ingredients,
  // selectedBunId: initialConstructorIngredientData.selectedBunId,
  ingredientDetails: null,
  orderDetails: null,
};

export const fetchOrder = createAsyncThunk(
  "burger/fetchOrder",

  async function (ingredients, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(orderApiUrl, {
        method: "POST",
        body: JSON.stringify({ ingredients }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBurgerIngredients = createAsyncThunk(
  "burger/fetchBurgerIngredients",

  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch(ingredientsApiUrl);

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }
      // const res_json = await res.json();
      // console.log(res_json.data);
      const response = await res.json();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
        ...(state.burgerConstructor ? state.burgerConstructor : []),
        {
          constructorId: action.payload.constructorId,
          _id: action.payload.ingredientId,
        },
      ];
    },
    moveConstructorIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;

      const movingElement = state.burgerConstructor[dragIndex];
      state.burgerConstructor.splice(dragIndex, 1);
      state.burgerConstructor.splice(hoverIndex, 0, movingElement);
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
    cleanOrderDetails(state, action) {
      state.orderDetails = null;
    },
  },

  // //fetchIngredients
  // [fetchBurgerIngredients.pending]: (state, action) => {
  //   console.log(1111);
  //   console.log(action);
  //   state.burgerIngredients = action.payload;
  //   state.burgerIngredientsLoadingError = null;
  // },
  // [fetchBurgerIngredients.fulfilled]: (state, action) => {
  //   console.log(2222);
  //   console.log(action);
  //   state.burgerIngredients = action.payload;
  //   state.burgerIngredientsLoadingError = null;
  // },
  // [fetchBurgerIngredients.rejected]: (state, action) => {
  //   console.log(33333);
  //   console.log(action.payload);

  //   state.burgerIngredients = null;
  //   state.burgerIngredientsLoadingError = action.payload;
  // },

  // extraReducers: {
  // //fetchOrder
  // [fetchOrder.pending]: (state, action) => {
  //   state.orderDetails = null;
  // },
  // [fetchOrder.fulfilled]: (state, action) => {
  //   state.orderDetails = {
  //     orderNumber: action.payload?.order?.number,
  //     hasError: null,
  //   };
  // },
  // [fetchOrder.rejected]: (state, action) => {
  //   state.orderDetails = {
  //     orderNumber: null,
  //     hasError: action.payload,
  //   };
  // },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchBurgerIngredients.pending, (state, action) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
        console.log(action.payload);

        state.burgerIngredients = action.payload;
        state.burgerIngredientsLoadingError = null;
      })
      .addCase(fetchBurgerIngredients.rejected, (state, action) => {
        state.burgerIngredients = null;
        state.burgerIngredientsLoadingError = action.payload;
      })
      ///////
      .addCase(fetchOrder.pending, (state, action) => {
        state.orderDetails = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderDetails = {
          orderNumber: action.payload?.order?.number,
          hasError: null,
        };
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderDetails = {
          orderNumber: null,
          hasError: action.payload,
        };
      });

    // },
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
  cleanOrderDetails,
} = burgerSlice.actions;
