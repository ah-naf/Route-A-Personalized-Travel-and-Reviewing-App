import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { RoutePostType, RouteSliceStateType } from "../util";

const URL = "http://localhost:5000/api";

export const postRouteThunk = createAsyncThunk(
  "route/postRoute",
  async (payload: RoutePostType) => {
    const res = await fetch(`${URL}/route`, {
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
    const res = await fetch(`${URL}/route`, {
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
    const res = await fetch(`${URL}/route/${payload}`, {
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
    const res = await fetch(`${URL}/route/${payload}`, {
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

export const postOrDeleteLikeThunk = createAsyncThunk(
  "review/postOrDeleteLike",
  async (payload: { routeId: string }) => {
    const res = await fetch(`${URL}/review/like`, {
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

    return data;
  }
);

export const getCommentThunk = createAsyncThunk(
  "review/getComment",
  async (payload: string) => {
    const res = await fetch(`${URL}/review/comment/${payload}`, {
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

export const postCommentThunk = createAsyncThunk(
  "review/postComment",
  async (payload: { routeId: string; text: string }) => {
    const res = await fetch(`${URL}/review/comment`, {
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
    return data;
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "review/deleteComment",
  async (payload: string) => {
    const res = await fetch(`${URL}/review/comment/${payload}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return null;
    }
    toast.success(data.msg);
    return data;
  }
);

const initialState: RouteSliceStateType = {
  loading: false,
  routes: [],
  activeRoute: null,
  suggestions: [],
  comments: [],
  render: false,
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
      state.suggestions = payload.suggestion;
    },
    [postOrDeleteLikeThunk.fulfilled.type]: (state, { payload }) => {
      // console.log(action);
      state.activeRoute = payload.route;
    },
    [getCommentThunk.fulfilled.type]: (state, { payload }) => {
      // console.log(action);
      state.comments = payload.comments;
    },
    [postCommentThunk.fulfilled.type]: (state, { payload }) => {
      // console.log(action);
      state.comments = payload.comments;
      state.render = !state.render;
    },
    [deleteCommentThunk.fulfilled.type]: (state, { payload }) => {
      // console.log(action);
      console.log(payload);
      state.comments = payload.comments;
      state.render = !state.render;
    },
  },
});

// export const {  } = RouteSlice.actions;

export default RouteSlice.reducer;
