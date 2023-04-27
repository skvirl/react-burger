import { jest } from "@jest/globals";
import reducer, { fetchForgotPassword, cleanForgotPasswordData } from "../slices/forgotPassword";
import { resolvedResponse, rejectedResponse } from "../../tests/fetchThunk";

describe("ForgotPassword reducer", () => {
  it("should clean forgotPasswordSuccess and forgotPasswordError", () => {

    const initialState = {
      forgotPasswordSuccess: true,
      forgotPasswordError: '',
        };

    const resultState = {   forgotPasswordSuccess: null,
      forgotPasswordError: null,
     };

    const action = {
      type: cleanForgotPasswordData.type,
      payload: {},
    };

    const result = reducer(initialState, action);

    expect(result).toEqual(resultState);
  });
});

describe("orderDetails thunk", () => {
  resolvedResponse({
    fetchFunction: fetchForgotPassword,
    fetchFunctionName: "fetchForgotPassword",
    response: { success: true,  },
  });

  rejectedResponse({
    fetchFunction: fetchForgotPassword,
    fetchFunctionName: "fetchForgotPassword",
  });
});

describe("orderDetails extra reducers", () => {
  const initialState = {
    orderNumber: null,
    orderDetailsLoadingError: null,
  };

  it("should change state with pending action", () => {
    const state = reducer(initialState, fetchForgotPassword.pending());
    expect(state.forgotPasswordSuccess).toBeNull();
    expect(state.forgotPasswordError).toBeNull();
  });

  it("should change state with fulfilled action", () => {

    const state = reducer(
      initialState,
      fetchForgotPassword.fulfilled({
        success: true,
      })
    );
    expect(state.forgotPasswordSuccess).toBeTruthy();
    expect(state.forgotPasswordError).toBeNull();
  });

  it("should change state with rejected action", () => {
    const rejectMessage = "page not found";

    const state = reducer(initialState, fetchForgotPassword.rejected(rejectMessage));

    expect(state.forgotPasswordSuccess).toBeNull();
    expect(state.forgotPasswordError).toBe(rejectMessage);
  });
});
