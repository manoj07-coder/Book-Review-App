import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (params = {}, thunkAPI) => {
    const res = await api.get("/books", { params });
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    list: {
      items: [],
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
