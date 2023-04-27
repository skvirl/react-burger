import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderApiUrl, request } from "../../utils/api";
import { getCookie } from "../../utils/cookies";

type TInitialState = {
  orderNumber: null | string;
  orderDetailsLoadingError: string | null | unknown;
};
const initialState: TInitialState = {
  orderNumber: null,
  orderDetailsLoadingError: null,
};
export type TOrderDetailsSlice = { orderDetails: TInitialState };
type TOrderNumberPayload = { order: { number: string } };

export const fetchOrder = createAsyncThunk(
  "burger/fetchOrder",

  async function (
    ingredients: string[],
    { rejectWithValue }
  ): Promise<TOrderNumberPayload | unknown> {

    try {
      return await request(orderApiUrl, {
        method: "POST",
        body: JSON.stringify({ ingredients }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "Bearer " + getCookie("accessToken"),
        },
      }).catch((err) => rejectWithValue(err));

     } catch (error: unknown) {
       if (error instanceof Error && "message" in error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const burgerSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    cleanOrderDetails(state) {
      state.orderNumber = null;
      state.orderDetailsLoadingError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderNumber = null;
        state.orderDetailsLoadingError = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderNumber = (
          action.payload as TOrderNumberPayload
        ).order.number;
        state.orderDetailsLoadingError = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        
        state.orderNumber = null;
        state.orderDetailsLoadingError = String(action.error.message);
      });
  },
});

export default burgerSlice.reducer;

export const { cleanOrderDetails } = burgerSlice.actions;
