import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
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

const tryToRefreshToken = async (errMessage) => {
  const jwtExpiredMes = "jwt expired";
  const refreshToken = getCookie("refreshToken");

  if (errMessage !== jwtExpiredMes || !refreshToken) return false;

  try {
    const res = await fetch(tokenUrl, {
      method: "POST",
      body: JSON.stringify({
        token: refreshToken,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res.ok) {
      const { success, accessToken, refreshToken } = await res.json();
      if (success) {
        accessToken &&
          setCookie("accessToken", accessToken.split("Bearer ")[1]);
        refreshToken && setCookie("refreshToken", refreshToken);
      }
      return true;
    }

    const resBody = await res.json();
    throw new Error(`Server Error: ${res.status}. ${resBody?.message} `);
  } catch (error) {
    return false;
  }
};

const options_POST = (body) => ({
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

const options_GET = (body) => ({
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + body,
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
      let res = await fetch(url, fetchOptions(body));
      console.log(res);
      console.log(444444444444);
      let resBody = await res.json();
      console.log(111111111111);
      console.log(resBody);
      if (!res.ok && tryToRefreshToken(resBody?.message)) {
        console.log(22222222222);

        res = await fetch(url, fetchOptions(body));
        resBody = await res.json();
      }

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}. ${resBody?.message} `);
      }

      return resBody;
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
