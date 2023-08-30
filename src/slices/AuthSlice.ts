import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AuthSliceStateType, UserType } from "../util";

const URL = "http://localhost:5000/api/auth";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (
    payload: {
      email: string;
      password: string;
      username: string;
      name: string;
    },
    { rejectWithValue }
  ) => {
    const res = await fetch(`${URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) return rejectWithValue({ ...data, status: "failed" });
    return { ...data, status: "success" };
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (
    payload: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const res = await fetch(`${URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) return rejectWithValue({ ...data, status: "failed" });
    return { ...data, status: "success" };
  }
);

export const verifyUserThunk = createAsyncThunk(
  "auth/verifyUser",
  async (payload, { rejectWithValue }) => {
    const res = await fetch(`${URL}/verify`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) return rejectWithValue({ ...data, status: "failed" });
    return { ...data, status: "success" };
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (payload, { rejectWithValue }) => {
    const res = await fetch(`${URL}/logout`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) return rejectWithValue({ ...data, status: "failed" });
    return { ...data, status: "success" };
  }
);

export const getUserThunk = createAsyncThunk(
  "auth/getUser",
  async (payload: string) => {
    const res = await fetch(`${URL}/user/${payload}`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  }
);

export const updateUserThunk = createAsyncThunk(
  "auth/updateUser",
  async (payload: UserType, { rejectWithValue }) => {
    const res = await fetch(`${URL}/user`, {
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
      return rejectWithValue({ ...data, status: "failed" });
    }
    toast.success(data.msg);
    return { ...data, status: "success" };
  }
);

const initialState: AuthSliceStateType = {
  user: null,
  profileUser: null,
  token: "",
  msg: "",
  status: "idle",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSetStatus: (state, { payload }) => {
      state.status = payload;
    },
    authSetUser: (state, { payload }) => {
      state.user = payload;
      state.profileUser = payload;
    },
  },
  extraReducers: {
    [registerUserThunk.fulfilled.type]: (state, action) => {
      state.msg = action.payload.msg;
      state.status = "success";
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [registerUserThunk.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [registerUserThunk.rejected.type]: (state, action) => {
      state.status = "failed";
      state.msg = action.payload.msg;
    },
    [loginUserThunk.fulfilled.type]: (state, action) => {
      state.msg = action.payload.msg;
      state.status = "success";
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [loginUserThunk.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [loginUserThunk.rejected.type]: (state, action) => {
      state.status = "failed";
      state.msg = action.payload.msg;
    },
    [verifyUserThunk.fulfilled.type]: (state, action) => {
      state.msg = action.payload.msg;
      state.status = "success";
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [logoutUserThunk.fulfilled.type]: (state, action) => {
      state.msg = action.payload.msg;
      state.status = "success";
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [getUserThunk.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [getUserThunk.fulfilled.type]: (state, action) => {
      state.status = "success";
      state.profileUser = action.payload.user;
    },
    [getUserThunk.rejected.type]: (state, action) => {
      state.status = "failed";
    },
    [updateUserThunk.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [updateUserThunk.rejected.type]: (state, action) => {
      state.status = "failed";
      state.msg = action.payload.msg;
    },
    [updateUserThunk.fulfilled.type]: (state, action) => {
      state.status = "success";
    },
  },
});

export const { authSetStatus, authSetUser } = AuthSlice.actions;

export default AuthSlice.reducer;