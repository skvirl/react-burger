import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderApiUrl, request } from "../../utils/api";
import { cleanConstructor } from "./burgerConstructor";
const initialState = {
  orderNumber: null,
  orderDetailsLoadingError: null,
};

export const fetchOrder = createAsyncThunk(
  "burger/fetchOrder",

  async function (ingredients, { rejectWithValue, dispatch }) {
    try {
       const result = await request(
        orderApiUrl,
        {
          method: "POST",
          body: JSON.stringify({ ingredients }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).catch(err=>rejectWithValue(err));
      
      // result?.success && dispatch(cleanConstructor());
      
      return result

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const burgerSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    cleanOrderDetails(state, action) {
      state.orderNumber = null;
      state.orderDetailsLoadingError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state, action) => {
        state.orderNumber = null;
        state.orderDetailsLoadingError = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload?.order?.number;
        state.orderDetailsLoadingError = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderNumber = null;
        state.orderDetailsLoadingError = action.payload;
      });
  },
});

export default burgerSlice.reducer;

export const { cleanOrderDetails } = burgerSlice.actions;
