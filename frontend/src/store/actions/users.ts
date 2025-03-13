import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ email, password }: { email: string; password: string }) =>
    // { dispatch }
    {
      // eslint-disable-next-line no-useless-catch
      try {
        const request = await axios.post("/api/auth/register", {
          email,
          password,
        });
        return { data: request.data.user, auth: true };
      } catch (error) {
        throw error;
      }
    }
);
