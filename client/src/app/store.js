import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookSlice from "../features/books/bookSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookSlice,
  },
});

export default store;
