import { createSlice, createAsyncThunk , AsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordUrl, request } from "../../utils/api";

type TInitialState = {
  forgotPasswordSuccess:boolean|null,
  forgotPasswordError:string|null|unknown,
}

const initialState: TInitialState = {
  forgotPasswordSuccess: null,
  forgotPasswordError: null,
};
export type TForgotPasswordSlice = {forgotPassword:TInitialState}

export const fetchForgotPassword  = createAsyncThunk(
  "burger/fetchForgotPassword",

  async function (body:{email:string}, { rejectWithValue }) {
    try {
      return await request(forgotPasswordUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch(err=>rejectWithValue(err));

    } catch (error: unknown) {
      if ( error instanceof Error && "message" in error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    cleanForgotPasswordData(state) {
      state.forgotPasswordSuccess = null;
      state.forgotPasswordError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, (state, action) => {
        state.forgotPasswordSuccess = null;
        state.forgotPasswordError = null;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordSuccess = !!action.payload?.success;
        state.forgotPasswordError = null;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.forgotPasswordSuccess = null;
        state.forgotPasswordError = String(action.error.message);
      });
  },
});

export default authSlice.reducer;

export const { cleanForgotPasswordData } = authSlice.actions;
