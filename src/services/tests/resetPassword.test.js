import { log } from "console";
import {jest} from '@jest/globals';
import { fetchResetPassword } from "../slices/resetPassword";
// import fetchMock from "fetch-mock";
// import thunk from "redux-thunk";

// fetchMock.getOnce("burger/fetchResetPassword", {
//   body: {
//     resetPasswordSuccess: true,
//     resetPasswordError: null,
//     resetPasswordMessage: null,
//   },
//   headers: { "content-type": "application/json" },
// });

describe("ResetPasswordThunk", () => {
//   afterEach(() => {
//     fetch.restore();
//   });

  it("should fetchResetPassword with resolved response", async () => {
    const TInitialState = {
      resetPasswordSuccess: null,
      resetPasswordError: null,
      resetPasswordMessage: null,
    };

    const dispatch = jest.fn();
    const thunk = fetchResetPassword();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;

    console.log(calls);

    expect(calls).toHaveLength(2);

    const [pendingCall, rejectedCall] = calls;
    expect(pendingCall[0].type).toBe(fetchResetPassword.pending().type);
    expect(rejectedCall[0].type).toBe(fetchResetPassword.rejected().type);

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  });
});
