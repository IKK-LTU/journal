import { usersApi } from "@/api/services/userApi";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import checkinsListReducer from "./features/checkins";

const isBrowser = typeof window !== "undefined";

const preloadedState = {
  checkins: isBrowser
    ? JSON.parse(localStorage.getItem("checkins") ?? "[]")
    : { checkinsList: [] }, // empty on server
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    checkins: checkinsListReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
  preloadedState,
});

// persist on every change
store.subscribe(() => {
  if (isBrowser) {
    store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("checkins", JSON.stringify(state.checkins));
    });
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
