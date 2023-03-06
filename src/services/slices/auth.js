import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUrl, loginUrl, logoutUrl, tokenUrl } from "../../utils/api";

const initialState = {
  errorMessage: null,
  success: null,
  accessToken: null,
  refreshToken: null,
  user: {
    email: null,
    name: null,
  },
};

const cloneObject = (sourceObj) => JSON.parse(JSON.stringify(initialState));

const fetchAuth = (actionType, url) =>
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
        throw new Error(`Server Error: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const fetchRegister = fetchAuth("burger/fetchRegister", registerUrl);
export const fetchLogin = fetchAuth("burger/login", loginUrl);
export const fetchLogout = fetchAuth("burger/logout", logoutUrl);
export const fetchToken = fetchAuth("burger/token", tokenUrl);

const pendingCB = (state, action) => {
  state.user = {
    email: null,
    name: null,
  };
  state.accessToken = null ;
  state.refreshToken =  null;
  state.success =  null ;
  state.errorMessage = null;
};

const fulfilledCB = (state, action) => {
  state.user = { ...state.user, ...action.payload.user };
  state.accessToken = action.payload.accessToken ;
  state.refreshToken =  action.payload.refreshToken ;
  state.success =  action.payload.success ;
  state.errorMessage = null;
};
const rejectedCB = (state, action) => {
  state.user = {
    email: null,
    name: null,
  };
  state.accessToken = null ;
  state.refreshToken =  null;
  state.success =  null ;
  state.errorMessage = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanAuthData(state, action) {
      state = cloneObject(initialState);
    },
  },

  extraReducers: (builder) => {
    [fetchRegister, fetchLogin, fetchLogout, fetchToken].forEach((thunk) => {
      builder
        .addCase(thunk.pending, pendingCB)
        .addCase(thunk.fulfilled, fulfilledCB)
        .addCase(thunk.rejected, rejectedCB);
    });
    // builder
    //   .addCase(fetchRegister.pending, pendingCB )
    //   .addCase(fetchRegister.fulfilled, fulfilledCB)
    //   .addCase(fetchRegister.rejected, rejectedCB)
    //   .addCase(fetchLogin.pending, pendingCB )
    //   .addCase(fetchLogin.fulfilled, fulfilledCB)
    //   .addCase(fetchLogin.rejected, rejectedCB)
    //   .addCase(fetchLogout.pending, pendingCB )
    //   .addCase(fetchLogout.fulfilled, fulfilledCB)
    //   .addCase(fetchLogout.rejected, rejectedCB)
    //   .addCase(fetchToken.pending, pendingCB )
    //   .addCase(fetchToken.fulfilled, fulfilledCB)
    //   .addCase(fetchToken.rejected, rejectedCB)
  },
});

export default authSlice.reducer;

export const { cleanAuthData } = authSlice.actions;
