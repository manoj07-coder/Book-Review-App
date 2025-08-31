import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    const res = await api.post("/signup", payload);
    return res.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    const res = await api.post("/login", payload);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    token: "",
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload.user);
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
