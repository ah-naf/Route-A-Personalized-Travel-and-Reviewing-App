import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import CustomNodeSlice from "./slices/CustomNodeSlice";
import RouteSlice from "./slices/RouteSlice";

export const store = configureStore({
  reducer: {
    customNode: CustomNodeSlice,
    auth: AuthSlice,
    route: RouteSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
