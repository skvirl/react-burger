import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordUrl, request } from "../../utils/api";



const initialState:{
  forgotPasswordSuccess:boolean|null,
  forgotPasswordError:string|null|unknown,
} = {
  forgotPasswordSuccess: null,
  forgotPasswordError: null,
};

export const fetchForgotPassword = createAsyncThunk(
  "burger/fetchForgotPassword",

  async function (body, { rejectWithValue }) {
    try {
      return await request(forgotPasswordUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch(err=>rejectWithValue(err));

    } catch (error:any) {
      console.log(error);
      
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    cleanForgotPasswordData(state, action) {
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
        state.forgotPasswordError = action.payload;
      });
  },
});

export default authSlice.reducer;

export const { cleanForgotPasswordData } = authSlice.actions;