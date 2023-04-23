import { jest } from "@jest/globals";
import reducer, { fetchOrder, cleanOrderDetails } from "../slices/orderDetails";
import { resolvedResponse, rejectedResponse } from "../../tests/fetchThunk";

describe("orderDetails reducer", () => {
  it("should clean orderNumber and orderDetailsLoadingError", () => {

    const initialState = {
      orderNumber: "some number data",
      orderDetailsLoadingError: null,
    };

    const resultState = { orderNumber: null, orderDetailsLoadingError: null };

    const action = {
      type: cleanOrderDetails.type,
      payload: {},
    };

    const result = reducer(initialState, action);

    expect(result).toEqual(resultState);
  });
});

describe("orderDetails thunk", () => {
  resolvedResponse({
    fetchFunction: fetchOrder,
    fetchFunctionName: "fetchOrder",
    response: { success: true, order: { number: "5555555" } },
  });

  rejectedResponse({
    fetchFunction: fetchOrder,
    fetchFunctionName: "fetchOrder",
  });
});

describe("orderDetails extra reducers", () => {
  const initialState = {
    orderNumber: null,
    orderDetailsLoadingError: null,
  };

  it("should change state with pending action", () => {
    const state = reducer(initialState, fetchOrder.pending());
    expect(state.orderNumber).toBeNull();
    expect(state.orderDetailsLoadingError).toBeNull();
  });

  it("should change state with fulfilled action", () => {
    const number = "5555555";

    const state = reducer(
      initialState,
      fetchOrder.fulfilled({
        success: true,
        order: { number },
      })
    );
    expect(state.orderNumber).toBe(number);
    expect(state.orderDetailsLoadingError).toBeNull();
  });

  it("should change state with rejected action", () => {
    const rejectMessage = "rejected message";

    const state = reducer(initialState, fetchOrder.rejected(rejectMessage));

    expect(state.orderNumber).toBeNull();
    expect(state.orderDetailsLoadingError).toBe(rejectMessage);
  });
});
