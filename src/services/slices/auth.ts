import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  requestWithTokenRefresh,
  registerUrl,
  loginUrl,
  logoutUrl,
  userUrl,
} from "../../utils/api";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookies";

type TState = {
  errorMessage: string | null | unknown;
  success: null | boolean;
  user: {
    email: null | string;
    name: null | string;
  };
};
export type TAuthSlice = { auth: TState };

const initialState: TState = {
  errorMessage: null,
  success: null,
  user: {
    email: null,
    name: null,
  },
};

type TLoginJson = { email: string; password: string };

type TRegisterJson = {
  email: string;
  password: string;
  name: string;
};
type TLogoutJson = {
  token: string;
};

const options_POST = (body: TLoginJson | TRegisterJson | TLogoutJson) => ({
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

const options_GET = () => ({
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + getCookie("accessToken"),
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
});

const options_PATCH = (body: {
  userData: { name: string; email: string; password: string };
  accessToken: string;
}) => ({
  method: "PATCH",
  body: JSON.stringify(body.userData),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    authorization: "Bearer " + getCookie("accessToken"),
  },
});

type TAuthPayload = {
  user: { email: string; name: string };
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

const fetchAuth = (actionType: string, url: URL, fetchOptions: Function) =>
  createAsyncThunk(
    actionType,
    async function (
      body: {
        userData?: {
          name: string;
          email: string;
          password: string;
        };
        accessToken?: string;
        email?: string;
        password?: string;
        name?: string;
        token?: string;
      },
      { rejectWithValue }
    ): Promise<TAuthPayload | unknown> {
      try {
        return requestWithTokenRefresh(url, fetchOptions(body))
          .then((val) => val)
          .catch(reason => { 
            console.log(reason);
            
            if (reason === `token refresh succes`) {
              return requestWithTokenRefresh(url, fetchOptions(body));
            } else {
              return rejectWithValue(reason);
            }
            return reason
          })
          .catch((reason) => {
            return rejectWithValue(reason);
          });
      } catch (error: unknown) {
        if (error instanceof Error && "message" in error) {

          return rejectWithValue(error.message);
        }
      }
    }
  );

export const fetchRegister = fetchAuth(
  "auth/register",
  registerUrl,
  options_POST
);
export const fetchLogin = fetchAuth("auth/login", loginUrl, options_POST);
export const fetchLogout = fetchAuth("auth/logout", logoutUrl, options_POST);
export const fetchGetUser = fetchAuth("auth/getUser", userUrl, options_GET);
export const fetchPatchUser = fetchAuth(
  "auth/patchUser",
  userUrl,
  options_PATCH
);

const pendingAuthCB = (state: TState) => {
  state.user = {
    email: null,
    name: null,
  };
  state.success = null;
  state.errorMessage = null;
};

const fulfilledAuthCB = (state: TState, payload: TAuthPayload) => {
  state.user = { ...state.user, ...payload.user };
  state.success = payload.success;
  state.errorMessage = null;
  payload.accessToken &&
    setCookie("accessToken", payload.accessToken.split("Bearer ")[1], { path: "/" });
  payload?.refreshToken && setCookie("refreshToken", payload.refreshToken, { path: "/" });
};

const rejectedAuthCB = (
  state: TState,
  message: string
) => {
  state.user = {
    email: null,
    name: null,
  };
  state.success = null;
  state.errorMessage = message;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder
      .addCase(fetchPatchUser.fulfilled, (state, action) => {
        fulfilledAuthCB(state, action.payload as TAuthPayload)
      })
      .addCase(fetchPatchUser.rejected, (state, action) => {
        rejectedAuthCB(state, String(action.error.message));
      })

      .addCase(fetchGetUser.fulfilled, (state, action) => {
        fulfilledAuthCB(state, action.payload as TAuthPayload)
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        rejectedAuthCB(state, String(action.error.message));
      })

      .addCase(fetchRegister.pending, pendingAuthCB)
      .addCase(fetchRegister.fulfilled, (state, action) => {
        fulfilledAuthCB(state, action.payload as TAuthPayload)
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        rejectedAuthCB(state, String(action.error.message));
      })

      .addCase(fetchLogin.pending, pendingAuthCB)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        fulfilledAuthCB(state, action.payload as TAuthPayload)
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        rejectedAuthCB(state, String(action.error.message));
      })

      .addCase(fetchLogout.pending, (state) => {
        state.errorMessage = null;
        state.success = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        pendingAuthCB(state);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      });
  },
});

export default authSlice.reducer;
