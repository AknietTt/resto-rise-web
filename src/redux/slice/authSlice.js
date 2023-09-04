import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAsync, userInfo } from "../../Requests/authRequests";

export const loginUser = createAsyncThunk(
  "auth/createUser",
  async function (user, { rejectWithValue }) {
    let response;
    try {
      response = await loginUserAsync(user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
    return response;
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async function (_, { rejectWithValue }) {
    let response;
    try {
      response = await userInfo();
      if (response?.status === 401) {
        response = await userInfo();
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};


const initialState = {
  user: null,
  status: "idle",
  error: null,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
   
    [fetchMe.pending]: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.status = "pending";
      state.error = null;
      state.user = action.payload;
    },
    [fetchMe.rejected]: setError,
    [loginUser.rejected]: setError,
  },
});

export default authSlice.reducer;
