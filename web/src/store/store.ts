import { usersApi } from "@/api/services/userApi";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import checkinsListReducer from "./features/checkins";
import { loadCheckins, saveCheckins } from "./checkinsStorage";

const preloadedState = {
  checkins: loadCheckins(),
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

// Persist check-ins on every change. Temporary: replaced by the API in Phase 5.
if (typeof window !== "undefined") {
  store.subscribe(() => saveCheckins(store.getState().checkins));
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
