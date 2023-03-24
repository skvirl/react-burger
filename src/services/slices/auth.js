import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestWithTokenRefresh,
  registerUrl,
  loginUrl,
  logoutUrl,
  tokenUrl,
  userUrl,
} from "../../utils/api";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookies";

const initialState = {
  errorMessage: null,
  success: null,
  user: {
    email: null,
    name: null,
  },
};

const options_POST = (body) => ({
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
    authorization: "Bearer " + getCookie('accessToken'),
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
});

const options_PATCH = (body) => ({
  method: "PATCH",
  body: JSON.stringify(body.userData),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    authorization: "Bearer " + body.accessToken,
  },
});

const fetchAuth = (actionType, url, fetchOptions) =>
  createAsyncThunk(actionType, async function (body, { rejectWithValue }) {
    try {
      return requestWithTokenRefresh(url, fetchOptions(body))
        .then((val) => val)
        .catch((reason) => {

          if (reason === `token refresh succes`) {
            return requestWithTokenRefresh(url, fetchOptions(body));
          } else {
            return rejectWithValue(reason);
          }
        })
        .catch((reason) => {
          return rejectWithValue(reason);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

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

const pendingAuthCB = (state, action) => {
  state.user = {
    email: null,
    name: null,
  };
  state.success = null;
  state.errorMessage = null;
};

const fulfilledAuthCB = (state, action) => {
  state.user = { ...state.user, ...action.payload.user };
  state.success = action.payload.success;
  state.errorMessage = null;
  action?.payload?.accessToken &&
    setCookie("accessToken", action.payload.accessToken.split("Bearer ")[1]);
  action?.payload?.refreshToken &&
    setCookie("refreshToken", action.payload.refreshToken);
};

const rejectedAuthCB = (state, action) => {
  state.user = {
    email: null,
    name: null,
  };
  state.accessToken = null;
  state.refreshToken = null;
  state.success = null;
  state.errorMessage = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    [fetchRegister, fetchLogin].forEach((thunk) => {
      builder
        .addCase(thunk.pending, pendingAuthCB)
        .addCase(thunk.fulfilled, fulfilledAuthCB)
        .addCase(thunk.rejected, rejectedAuthCB);
    });

    [fetchPatchUser, fetchGetUser].forEach((thunk) => {
      builder
        .addCase(thunk.fulfilled, fulfilledAuthCB)
        .addCase(thunk.rejected, rejectedAuthCB);
    });

    builder
      .addCase(fetchLogout.pending, (state, action) => {
        state.errorMessage = null;
        state.success = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        pendingAuthCB(state, action);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      });
  },
});

export default authSlice.reducer;

export const { cleanAuthData } = authSlice.actions;
