import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (params = {}, thunkAPI) => {
    const res = await api.get("/books", { params });
    return res.data;
  }
);
export const fetchBooksById = createAsyncThunk(
  "books/fetchBookById",
  async ({ id, reviewPage = 1, reviewLimit = 5 }, thunkAPI) => {
    const res = await api.get(`/books/${id}`, {
      params: { reviewPage, reviewLimit },
    });
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
      })
      .addCase(fetchBooksById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchBooksById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
