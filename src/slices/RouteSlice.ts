import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { RoutePostType, RouteSliceStateType } from "../util";

const URL = "http://localhost:5000/api/route";

export const postRouteThunk = createAsyncThunk(
  "route/postRoute",
  async (payload: RoutePostType) => {
    console.log(payload)
    const res = await fetch(`${URL}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    toast.success(data.msg);
    return null;
  }
);

const initialState: RouteSliceStateType = {
  loading: false
}

export const RouteSlice = createSlice({
  name: "routeSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [postRouteThunk.pending.type]: (state) => {
      state.loading = true
    },
    [postRouteThunk.fulfilled.type]: (state) => {
      state.loading = false
    },
    [postRouteThunk.rejected.type]: (state) => {
      state.loading = false
    }
  },
});

// export const {  } = RouteSlice.actions;

export default RouteSlice.reducer;
