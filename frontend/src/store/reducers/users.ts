import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../actions/users";

const DEFAULT_USER_STATE = {
  loading: false,
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    age: null,
    role: null,
    verified: null,
  },
  auth: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: DEFAULT_USER_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
