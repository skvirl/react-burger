import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUrl,
  loginUrl,
  logoutUrl,
  tokenUrl,
  userUrl,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookies";

const initialState = {
  errorMessage: null,
  success: null,
  user: {
    email: null,
    name: null,
  },
};

const postAuth = (actionType, url) =>
  createAsyncThunk(actionType, async function (body, { rejectWithValue }) {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!res.ok) {
        const resBody = await res.json();
        throw new Error(`Server Error: ${res.status}. ${resBody?.message} `);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

const getAuth = (actionType, url) =>
  createAsyncThunk(actionType, async function (body, { rejectWithValue }) {
    try {
 
      const res = await fetch(url, {
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
      if (!res.ok) {
        const resBody = await res.json();
        throw new Error(`Server Error: ${res.status}. ${resBody?.message} `);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

const patchAuth = (actionType, url) =>
  createAsyncThunk(actionType, async function (body, { rejectWithValue }) {

    try {
      const res = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(body.userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "Bearer " + body.accessToken,
        },
      });

      if (!res.ok) {
        const resBody = await res.json();
        throw new Error(`Server Error: ${res.status}. ${resBody?.message} `);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const fetchRegister = postAuth("auth/register", registerUrl);
export const fetchLogin = postAuth("auth/login", loginUrl);
export const fetchLogout = postAuth("auth/logout", logoutUrl);
export const fetchToken = postAuth("auth/token", tokenUrl);
export const fetchGetUser = getAuth("auth/getUser", userUrl);
export const fetchPatchUser = patchAuth("auth/patchUser", userUrl);

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
    
    [ fetchRegister,
      fetchLogin,
      fetchToken,
    ].forEach((thunk) => {
      builder
        .addCase(thunk.pending, pendingAuthCB)
        .addCase(thunk.fulfilled, fulfilledAuthCB)
        .addCase(thunk.rejected, rejectedAuthCB);
    });

    [ fetchPatchUser,
      fetchGetUser,
    ].forEach((thunk) => {
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
      })
  
     // .addCase(fetchToken.pending, pendingCB )
    // .addCase(fetchToken.fulfilled, fulfilledCB)
    // .addCase(fetchToken.rejected, rejectedCB)
  },
});

export default authSlice.reducer;

export const { cleanAuthData } = authSlice.actions;
