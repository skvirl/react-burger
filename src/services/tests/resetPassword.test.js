import { jest } from "@jest/globals";
import reducer, { fetchResetPassword } from "../slices/resetPassword";
import { resolvedResponse , rejectedResponse} from "../../tests/fetchThunk";


describe("ResetPassword thunk", () => {

  resolvedResponse({
    fetchFunction:fetchResetPassword,
    fetchFunctionName:'fetchResetPassword',
    response:{ success: true, message: "" },
  });
  
  rejectedResponse({
    fetchFunction:fetchResetPassword,
    fetchFunctionName:'fetchResetPassword',
   });

});

describe("ResetPassword extra reducers", () => {
  const initialState = {
    resetPasswordSuccess: null,
    resetPasswordError: null,
    resetPasswordMessage: null,
  };

  it("should change state with pending action", () => {
    const state = reducer(initialState, fetchResetPassword.pending());
    expect(state.resetPasswordSuccess).toBeNull();
    expect(state.resetPasswordMessage).toBeNull();
    expect(state.resetPasswordError).toBeNull();
  });

  it("should change state with fulfilled action", () => {
    const state = reducer(
      initialState,
      fetchResetPassword.fulfilled({
        success: true,
        message: "fulfilled message",
      })
    );
    expect(state.resetPasswordSuccess).toBeTruthy();
    expect(state.resetPasswordMessage).toBe("fulfilled message");
    expect(state.resetPasswordError).toBeNull();
  });

  it("should change state with rejected action", () => {
    const state = reducer(
      initialState,
      fetchResetPassword.rejected("rejected message")
    );
    expect(state.resetPasswordSuccess).toBeNull();
    expect(state.resetPasswordMessage).toBeNull();
    expect(state.resetPasswordError).toBe("rejected message");
  });
});
