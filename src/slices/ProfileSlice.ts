import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileSliceStateType } from "../util";

const URL = "http://localhost:5000/api";

export const getUserThunk = createAsyncThunk(
  "profile/getUser",
  async (payload: string) => {
    const res = await fetch(`${URL}/auth/user/${payload}`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  }
);

export const getUserRoutesThunk = createAsyncThunk(
  "profile/getUserRoutes",
  async (payload: string) => {
    const res = await fetch(`${URL}/route/user/${payload}`, {
      credentials: "include",
    });
    const data = await res.json();

    return data;
  }
);

const initialState: ProfileSliceStateType = {
  profileUser: null,
  userRoutes: [],
  loading: false,
};

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    profileSetUser: (state, { payload }) => {
      state.profileUser = payload;
    },
  },
  extraReducers: {
    [getUserThunk.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getUserThunk.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.profileUser = action.payload.user;
    },
    [getUserThunk.rejected.type]: (state, action) => {
      state.loading = false;
    },
    [getUserRoutesThunk.fulfilled.type]: (state, { payload }) => {
      state.userRoutes = payload.routes;
    },
  },
});

export const { profileSetUser } = ProfileSlice.actions;

export default ProfileSlice.reducer;
