import { usersApi } from "@/api/services/userApi";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import checkinsListSlice from "./features/checkins";

const preloadedState = {
  checkins: JSON.parse(localStorage.getItem("checkins") ?? "[]"),
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    checkins: checkinsListSlice,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
  preloadedState,
});

// persist on every change
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("checkins", JSON.stringify(state.checkins));
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
