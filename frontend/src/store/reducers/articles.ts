import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  addArticle,
  ArticleResponse,
} from "../actions/articles";

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    homeSort: {
      sortby: "_id",
      order: "desc",
      limit: 8,
      skip: 0,
    },
    loading: false,
    articles: [],
    current: null,
    categories: [],
    lastAdded: null as ArticleResponse | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.lastAdded = action.payload;
      })
      .addCase(addArticle.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default articlesSlice.reducer;
