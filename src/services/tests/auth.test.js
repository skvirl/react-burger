import reducer, { fetchRegister } from "../slices/auth";
import { resolvedResponse, rejectedResponse } from "../../tests/fetchThunk";

describe("fetchRegister thunk", () => {
  resolvedResponse({
    fetchFunction: fetchRegister,
    fetchFunctionName: "fetchRegister",
    response: {
      success: true,
      user: "userName",
      accessToken: true,
      refreshToken: true,
    },
  });

  rejectedResponse({
    fetchFunction: fetchRegister,
    fetchFunctionName: "fetchRegister",
  });
});
