import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postRouteThunk = createAsyncThunk(
  "route/postRoute",
  async (payload) => {
    //s
  }
);

export const RouteSlice = createSlice({
  name: "routeSlice",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

// export const {  } = RouteSlice.actions;

export default RouteSlice.reducer;
