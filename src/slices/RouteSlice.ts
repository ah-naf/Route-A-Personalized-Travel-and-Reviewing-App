import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { RoutePostType, RouteSliceStateType } from "../util";

const URL = "http://localhost:5000/api/route";

export const postRouteThunk = createAsyncThunk(
  "route/postRoute",
  async (payload: RoutePostType) => {
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

export const getAllRouteThunk = createAsyncThunk(
  "route/getAllRoute",
  async () => {
    const res = await fetch(`${URL}`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    return data;
  }
);

export const getSingleRouteThunk = createAsyncThunk(
  "route/getSingleRoute",
  async (payload: string) => {
    const res = await fetch(`${URL}/${payload}`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    return data;
  }
);

export const deleteRouteThunk = createAsyncThunk(
  "route/deleteRoute",
  async (payload: string) => {
    const res = await fetch(`${URL}/${payload}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    toast.success(data.msg);
    return payload;
  }
);

const initialState: RouteSliceStateType = {
  loading: false,
  routes: [],
  activeRoute: null
};

export const RouteSlice = createSlice({
  name: "routeSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [postRouteThunk.pending.type]: (state) => {
      state.loading = true;
    },
    [postRouteThunk.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [postRouteThunk.rejected.type]: (state) => {
      state.loading = false;
    },
    [getAllRouteThunk.pending.type]: (state) => {
      state.loading = true;
    },
    [getAllRouteThunk.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.routes = payload.routes;
    },
    [getAllRouteThunk.rejected.type]: (state) => {
      state.loading = false;
    },
    [deleteRouteThunk.fulfilled.type]: (state, { payload }) => {
      // console.log(action);
      state.routes = state.routes.filter((val) => val.id !== payload);
    },
    [getSingleRouteThunk.fulfilled.type]: (state, { payload }) => {
      // console.log(action);
      state.activeRoute = payload.route;
    },
  },
});

// export const {  } = RouteSlice.actions;

export default RouteSlice.reducer;
