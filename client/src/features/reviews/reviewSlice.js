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
      });
  },
});

export default reviewSlice.reducer;
