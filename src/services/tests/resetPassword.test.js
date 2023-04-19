import { jest } from "@jest/globals";
import { fetchResetPassword } from "../slices/resetPassword";

describe("ResetPasswordThunk", () => {
  it("should fetchResetPassword with resolved response", async () => {
    const response = { success: true, message: "" };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const dispatch = jest.fn();
    const thunk = fetchResetPassword();
    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pendingCall, rejectedCall] = calls;

    expect(pendingCall[0].type).toBe(fetchResetPassword.pending().type);
    expect(rejectedCall[0].type).toBe(fetchResetPassword.fulfilled().type);
    expect(rejectedCall[0].payload).toBe(response);
  });
});
