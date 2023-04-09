import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../types/TOrder";
 
type TInitialState = {
  orders: TOrder[] | null;
  success: boolean | null;
  total: number | null;
  totalToday: number | null;
} ;

const initialState: TInitialState = {
  orders: null,
  success: null,
  total: null,
  totalToday: null,
} ;
export type TOrderFeedSlice = { orderFeed: TInitialState };

const orderFeedSlice = createSlice({
  name: "orderFeed",
  initialState,
  reducers: {
    setOrderFeedData(state, action: PayloadAction<TInitialState>) {
       state.orders = action.payload.orders
        ? action.payload.orders.map((val) => ({
            ...val,
            status: statusTRanslate(val.status),
          }))
        : [];
      state.success = action.payload.success;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setOrderFeedClose(state ) {
      state.success = false;
    }    
  },
});

function statusTRanslate(status: string) {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      return status;
  }
}

export default orderFeedSlice.reducer;

export const { setOrderFeedData,setOrderFeedClose } = orderFeedSlice.actions;
