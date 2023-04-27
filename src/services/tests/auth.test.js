import reducer, { fetchRegister,fetchLogout } from "../slices/auth";
import { resolvedResponse, rejectedResponse } from "../../tests/fetchThunk";


const initialState = {
  errorMessage: null,
  success: null,
  user: {
    email: null,
    name: null,
  },
};

const testPayload = {
  success: true,
  user: {
    email: "email",
    name: "userName",
  },
  accessToken:  "1111111111111111111",
  refreshToken: "2222222222222222222",
};

describe("fetchRegister thunk", () => {
  resolvedResponse({
    fetchFunction: fetchRegister,
    fetchFunctionName: "fetchRegister",
    response: testPayload,
  });

  rejectedResponse({
    fetchFunction: fetchRegister,
    fetchFunctionName: "fetchRegister",
  });
});

describe("fetchRegister extra reducers", () => {
  it("should change state with pending action", () => {
    const state = reducer(
      testPayload,
      fetchRegister.pending()
    );

    expect(state.errorMessage).toBeNull();
    expect(state.success).toBeNull();
    expect(state.user.email).toBeNull();
    expect(state.user.name).toBeNull();
  });

  it("should change state with fulfilled action", () => {
    const state = reducer(initialState, fetchRegister.fulfilled(testPayload));
    expect(state.errorMessage).toBeNull();
    expect(state.success).toBeTruthy();
    expect(state.user.email).toBe(testPayload.user.email);
    expect(state.user.name).toBe(testPayload.user.name);
  });

  it("should change state with rejected action", () => {
    const rejectMessage = "page not found";

    const state = reducer(initialState, fetchRegister.rejected(rejectMessage));

    expect(state.errorMessage).toBe(rejectMessage);
    expect(state.success).toBeNull();
    expect(state.user.email).toBeNull();
    expect(state.user.name).toBeNull();
  });
});

describe("fetchLogout extra reducers", () => {

  it("should change state with pending action", () => {
    const state = reducer(
      testPayload,
      fetchLogout.pending()
    );

    expect(state.errorMessage).toBeNull();
    expect(state.success).toBeNull();
    expect(state.user.email).toBeDefined();
    expect(state.user.name).toBeDefined();
  });

  it("should change state with fulfilled action", () => {
    const state = reducer(initialState, fetchLogout.fulfilled(testPayload));
    expect(state.errorMessage).toBeNull();
    expect(state.success).toBeNull();
    expect(state.user.email).toBeDefined();
    expect(state.user.name).toBeDefined();
  });

});
