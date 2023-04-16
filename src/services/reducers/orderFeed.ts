import { createReducer,PayloadAction } from "@reduxjs/toolkit";
import { TFeedState as TInitialState } from "../../types/TOrderFeed";
import { wsMessage, wsClose } from "../actions/orderFeed";

const initialState: TInitialState = {
  orders: null,
  success: null,
  total: null,
  totalToday: null,
};

export type TOrderFeedSlice = { orderFeed: TInitialState };

 
export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsMessage, (state, action: PayloadAction<TInitialState>) => {
        state.orders = action.payload.orders
        ? action.payload.orders.map((val) => ({
            ...val,
            status: statusTRanslate(val.status),
          }))
        : [];
      state.success = action.payload.success;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
       })
    .addCase(wsClose, (state) => {
        state.success = false;
    });
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