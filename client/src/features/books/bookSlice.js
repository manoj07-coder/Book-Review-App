import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../reviews/reviewSlice";

// ✅ Fetch all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (params = {}, thunkAPI) => {
    const endpoint = params.q ? "/search" : "/books";
    const res = await api.get(endpoint, { params });
    return res.data;
  }
);

// ✅ Create new book
export const createBook = createAsyncThunk(
  "books/create",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await api.post("/books", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// ✅ Fetch book by id with reviews (paginated)
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
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📚 fetchBooks
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

      // 📖 fetchBooksById
      .addCase(fetchBooksById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;

        // ✅ Ensure newest reviews first
        if (state.current?.reviews?.items) {
          state.current.reviews.items.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
      })

      .addCase(fetchBooksById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ➕ createBook
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        // FIX: typo "unhift" -> "unshift"
        state.list.items.unshift(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ⭐ createReview → insert at TOP
      .addCase(createReview.fulfilled, (state, action) => {
        if (state.current?.reviews?.items) {
          // Add new review
          state.current.reviews.items.unshift(action.payload);

          // ✅ Re-sort after adding
          state.current.reviews.items.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          // Update total & avg rating
          state.current.reviews.total += 1;
          const ratings = state.current.reviews.items.map((r) => r.rating);
          state.current.book.avgRating =
            ratings.reduce((a, b) => a + b, 0) / ratings.length;
        }
      })

      // ✏️ updateReview
      .addCase(updateReview.fulfilled, (state, action) => {
        if (state.current) {
          const idx = state.current.reviews.items.findIndex(
            (r) => r._id === action.payload._id
          );
          if (idx > -1) {
            state.current.reviews.items[idx] = action.payload;
          }
          const ratings = state.current.reviews.items.map((r) => r.rating);
          state.current.book.avgRating =
            ratings.reduce((a, b) => a + b, 0) / ratings.length;
        }
      })

      // ❌ deleteReview
      .addCase(deleteReview.fulfilled, (state, action) => {
        if (state.current) {
          state.current.reviews.items = state.current.reviews.items.filter(
            (r) => r._id !== action.payload._id
          );
          state.current.reviews.total -= 1;
          const ratings = state.current.reviews.items.map((r) => r.rating);
          state.current.book.avgRating =
            ratings.length > 0
              ? ratings.reduce((a, b) => a + b, 0) / ratings.length
              : 0;
        }
      });
  },
});

export default bookSlice.reducer;
