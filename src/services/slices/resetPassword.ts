import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordUrl, request } from "../../utils/api";

type TInitialState = {
  resetPasswordSuccess: null|boolean;
  resetPasswordError: string | null ;
  resetPasswordMessage: null | string;
};
const initialState: TInitialState = {
  resetPasswordSuccess: null,
  resetPasswordError: null,
  resetPasswordMessage: null,
};
export type TResetPassword = { resetPassword: TInitialState };

export const fetchResetPassword = createAsyncThunk(
  "burger/fetchResetPassword",

  async function (
    body: { password: string; token: string },
    { rejectWithValue }
  ) {
    try {
      return await request(resetPasswordUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((err) => rejectWithValue(err));
    } catch (error: unknown) {
      if (error instanceof Error && "message" in error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    cleanResetPasswordData(state) {
      state.resetPasswordSuccess = null;
      state.resetPasswordError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchResetPassword.pending, (state) => {
        state.resetPasswordSuccess = null;
        state.resetPasswordMessage = null;
        state.resetPasswordError = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.resetPasswordSuccess = !!action.payload?.success;
        state.resetPasswordMessage = String(action.payload?.message);
        state.resetPasswordError = null;

      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.resetPasswordSuccess = null;
        state.resetPasswordMessage = null;
        state.resetPasswordError = String(action.error.message);
      });
  },
});

export default authSlice.reducer;

export const { cleanResetPasswordData } = authSlice.actions;
