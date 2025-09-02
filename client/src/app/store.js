import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookSlice from "../features/books/bookSlice";
import reviewSlice from "../features/reviews/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookSlice,
    reviews: reviewSlice,
  },
});

export default store;
