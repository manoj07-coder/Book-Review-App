import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const createReview = createAsyncThunk(
  "reviews/create",
  async ({ bookId, rating, comment }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await api.post(
      `/books/${bookId}/reviews`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { bookId, review: res.data };
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async ({ reviewId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await api.delete(`/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { reviewId };
  }
);

export const updateReview = createAsyncThunk(
  "review/update",
  async ({ reviewId, rating, comment }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await api.put(
      `/reviews/${reviewId}`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: { loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
