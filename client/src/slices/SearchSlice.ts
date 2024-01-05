import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { SearchSliceStateType } from "../util";

const URL = "http://localhost:5000/api";

export const getAllRouteThunk = createAsyncThunk(
  "search/getAllRoute",
  async ({
    source,
    destination,
  }: {
    source: null | undefined | string;
    destination: null | undefined | string;
  }) => {
    const res = await fetch(
      `${URL}/search?source=${source}&&destination=${destination}`
    );
    const data = await res.json();
    return data;
  }
);

export const addBookmarkThunk = createAsyncThunk(
  "bookmark/addBookmark",
  async ({ routeId }: { routeId: string }) => {
    const res = await fetch(`${URL}/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ routeId }),
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

export const getAllBookmarkThunk = createAsyncThunk(
  "bookmark/getAllBookmark",
  async () => {
    const res = await fetch(`${URL}/bookmark`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

export const deleteAllBookmarkThunk = createAsyncThunk(
  "bookmark/deleteAllBookmark",
  async () => {
    const res = await fetch(`${URL}/bookmark`, {
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

const initialState: SearchSliceStateType = {
  routes: [],
  bookmarks: [],
  render: false,
};

export const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {
    setRenderSearchSlice: (state) => {
      state.render = !state.render;
    },
  },
  extraReducers: {
    [getAllRouteThunk.fulfilled.type]: (state, { payload }) => {
      state.routes = payload.routes;
    },
    [addBookmarkThunk.fulfilled.type]: (state, { payload }) => {
      state.bookmarks = payload.bookmarks;
      if (payload.type === "create") {
        state.routes = state.routes.map((rt) => {
          if (rt.id === payload.bookmark.routeId && rt.bookmarks) {
            return { ...rt, bookmarks: [...rt.bookmarks, payload.bookmark] };
          }
          return rt;
        });
      } else {
        state.routes = state.routes.map((rt) => {
          if (rt.id === payload.routeId) {
            const filteredBookmark = payload.bookmark;
            return { ...rt, bookmarks: filteredBookmark };
          }
          return rt;
        });
      }
    },
    [getAllBookmarkThunk.fulfilled.type]: (state, { payload }) => {
      state.bookmarks = payload.bookmarks;
    },
    [deleteAllBookmarkThunk.fulfilled.type]: (state, { payload }) => {
      state.bookmarks = [];
      state.routes = state.routes.map((rt) => {
        return {
          ...rt,
          bookmarks: rt.bookmarks?.filter((bm) => bm.userId !== payload.userId),
        };
      });
    },
  },
});

export const { setRenderSearchSlice } = SearchSlice.actions;

export default SearchSlice.reducer;
