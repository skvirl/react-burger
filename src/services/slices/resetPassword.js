import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordUrl } from "../../utils/api";

const initialState = {
  resetPasswordSuccess: null,
  resetPasswordError: null,
  resetPasswordMessage: null,
};

export const fetchResetPassword = createAsyncThunk(
  "burger/fetchResetPassword",

  async function (body, { rejectWithValue }) {
    try {
      const res = await fetch(resetPasswordUrl, {
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
        state.resetPasswordSuccess = action.payload?.success
        state.resetPasswordMessage = action.payload?.message
        state.resetPasswordError = null;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.resetPasswordSuccess = null;
        state.resetPasswordMessage = null;
        state.resetPasswordError =  action.payload;
       });
  },
});

export default authSlice.reducer;

export const {
  cleanResetPasswordData,
} = authSlice.actions;
