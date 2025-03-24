import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorGlobal, successGlobal } from "../reducers/notifications";
import axios from "axios";
import { getAuthHeader } from "../../utils/tools";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const request = await axios.post("/api/auth/register", {
        email,
        password,
      });

      dispatch(successGlobal("User registered successfully"));

      return { data: request.data.user, auth: true };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        dispatch(errorGlobal(error.response.data.message));
      } else {
        dispatch(errorGlobal("An unexpected error occurred"));
      }
      throw error;
    }
  }
);

export const signInUser = createAsyncThunk(
  "users/signInUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const request = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      dispatch(successGlobal("User signed in successfully"));

      return { data: request.data.user, auth: true };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        dispatch(errorGlobal(error.response.data.message));
      } else {
        dispatch(errorGlobal("An unexpected error occurred"));
      }
      throw error;
    }
  }
);

export const isAuth = createAsyncThunk("users/isAuth", async () => {
  try {
    const request = await axios.get("/api/auth/isauth", getAuthHeader());

    return { data: request.data, auth: true };
  } catch (error) {
    return { data: {}, auth: false };
  }
});
