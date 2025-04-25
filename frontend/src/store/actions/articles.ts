import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorGlobal } from "../reducers/notifications";
import { getAuthHeader } from "../../utils/tools";

export const getCategories = createAsyncThunk(
  "articles/getCategories",
  async (_, { dispatch }) => {
    try {
      const request = await axios.get(
        "/api/articles/categories",
        getAuthHeader()
      );
      return request.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch(errorGlobal(error.response.data.message));
      } else {
        dispatch(errorGlobal("An unknown error occurred"));
      }
      throw error;
    }
  }
);
