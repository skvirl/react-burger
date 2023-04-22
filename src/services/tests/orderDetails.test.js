import { jest } from "@jest/globals";
import reducer, { fetchOrder } from "../slices/orderDetails";
import { resolvedResponse } from "../../tests/fetchThunk";

describe("orderDetails thunk", () => {
  resolvedResponse({
    fetchFunction:fetchOrder,
    fetchFunctionName:'fetchOrder',
    response:{order:{number:'123123123'}},
  });

  // it("should fetchResetPassword with resolved response", async () => {
  //   const response = { success: true, message: "" };

  //   fetch.mockResolvedValue({
  //     ok: true,
  //     json: () => Promise.resolve(response),
  //   });

  //   const dispatch = jest.fn();
  //   const thunk = fetchResetPassword();
  //   await thunk(dispatch, () => ({}));

  //   const { calls } = dispatch.mock;
  //   expect(calls).toHaveLength(2);
  //   const [pendingCall, fulfilledCall] = calls;

  //   expect(pendingCall[0].type).toBe(fetchResetPassword.pending().type);
  //   expect(fulfilledCall[0].type).toBe(fetchResetPassword.fulfilled().type);
  //   expect(fulfilledCall[0].payload).toBe(response);
  // });

  // it("should fetchResetPassword with rejected response", async () => {
  //   const response = "Ошибка undefined: undefined";

  //   fetch.mockResolvedValue({
  //     ok: false,
  //   });

  //   const dispatch = jest.fn();
  //   const thunk = fetchResetPassword();
  //   await thunk(dispatch, () => ({}));

  //   const { calls } = dispatch.mock;
  //   expect(calls).toHaveLength(2);
  //   const [pendingCall, rejectedCall] = calls;

  //   expect(pendingCall[0].type).toBe(fetchResetPassword.pending().type);
  //   expect(rejectedCall[0].type).toBe(fetchResetPassword.rejected().type);
  //   expect(rejectedCall[0].payload).toBe(response);
  // });
});

// describe("orderDetails extra reducers", () => {
//   const initialState = {
//     resetPasswordSuccess: null,
//     resetPasswordError: null,
//     resetPasswordMessage: null,
//   };

//   it("should change state with pending action", () => {
//     const state = reducer(initialState, fetchResetPassword.pending());
//     expect(state.resetPasswordSuccess).toBeNull();
//     expect(state.resetPasswordMessage).toBeNull();
//     expect(state.resetPasswordError).toBeNull();
//   });

//   it("should change state with fulfilled action", () => {
//     const state = reducer(
//       initialState,
//       fetchResetPassword.fulfilled({
//         success: true,
//         message: "fulfilled message",
//       })
//     );
//     expect(state.resetPasswordSuccess).toBeTruthy();
//     expect(state.resetPasswordMessage).toBe("fulfilled message");
//     expect(state.resetPasswordError).toBeNull();
//   });

//   it("should change state with rejected action", () => {
//     const state = reducer(
//       initialState,
//       fetchResetPassword.rejected("rejected message")
//     );
//     expect(state.resetPasswordSuccess).toBeNull();
//     expect(state.resetPasswordMessage).toBeNull();
//     expect(state.resetPasswordError).toBe("rejected message");
//   });
// });
