import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import CustomNodeSlice from "./slices/CustomNodeSlice";
import ProfileSlice from "./slices/ProfileSlice";
import ReviewSlice from "./slices/ReviewSlice";
import RouteSlice from "./slices/RouteSlice";
import SearchSlice from "./slices/SearchSlice";

export const store = configureStore({
  reducer: {
    customNode: CustomNodeSlice,
    auth: AuthSlice,
    route: RouteSlice,
    profile: ProfileSlice,
    search: SearchSlice,
    review: ReviewSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
