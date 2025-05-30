import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorGlobal, successGlobal } from "../reducers/notifications";
import { getAuthHeader } from "../../utils/tools";

export interface ArticlePayload {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  score: string;
  director: string;
  actors: never[];
  status: string;
  category:
    | string
    | {
        _id: string;
        name: string;
      };
}

export interface ArticleResponse {
  data: unknown;
}

export const addArticle = createAsyncThunk<ArticleResponse, ArticlePayload>(
  "articles/addArticle",
  async (article, { dispatch }) => {
    try {
      const request = await axios.post(
        "/api/articles",
        article,
        getAuthHeader()
      );
      dispatch(successGlobal("Article added successfully"));
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

export const getAdminArticle = createAsyncThunk<ArticlePayload, string>(
  "articles/getAdminArticle",
  async (_id, { dispatch }) => {
    try {
      const request = await axios.get(`/api/articles/${_id}`, getAuthHeader());
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
