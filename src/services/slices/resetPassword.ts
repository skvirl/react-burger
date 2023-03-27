import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordUrl, request } from "../../utils/api";

const initialState: {
  resetPasswordSuccess: null;
  resetPasswordError: string|null|unknown;
  resetPasswordMessage: null | string;
} = {
  resetPasswordSuccess: null,
  resetPasswordError: null,
  resetPasswordMessage: null,
};

export const fetchResetPassword:any = createAsyncThunk(
  "burger/fetchResetPassword",

  async function (body, { rejectWithValue }) {
    try {
      return await request(resetPasswordUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((err) => rejectWithValue(err));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    cleanResetPasswordData(state, action) {
      state.resetPasswordSuccess = null;
      state.resetPasswordError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchResetPassword.pending, (state, action) => {
        state.resetPasswordSuccess = null;
        state.resetPasswordMessage = null;
        state.resetPasswordError = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.resetPasswordSuccess = action.payload?.success;
        state.resetPasswordMessage = action.payload?.message;
        state.resetPasswordError = null;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.resetPasswordSuccess = null;
        state.resetPasswordMessage = null;
        state.resetPasswordError = String(action.payload);
      });
  },
});

export default authSlice.reducer;

export const { cleanResetPasswordData } = authSlice.actions;
