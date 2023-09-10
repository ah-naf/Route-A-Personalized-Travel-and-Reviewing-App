import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SearchSliceStateType } from "../util";

const URL = "http://localhost:5000/api";

export const getAllRouteThunk = createAsyncThunk(
  "search/getAllRoute",
  async () => {
    const res = await fetch(`${URL}/search/`);
    const data = await res.json();
    return data;
  }
);

const initialState: SearchSliceStateType = {
  routes: [],
  isBookmarked: []
};

export const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllRouteThunk.fulfilled.type]: (state, { payload }) => {
      state.routes = payload.routes;
    },
  },
});

// export const {  } = SearchSlice.actions;

export default SearchSlice.reducer;
