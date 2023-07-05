import { configureStore } from '@reduxjs/toolkit'
import CustomNodeSlice from './slices/CustomNodeSlice'

export const store = configureStore({
  reducer: {
    customNode: CustomNodeSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch