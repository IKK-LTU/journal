import { usersApi } from "@/api/services/userApi";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import checkinsListReducer from "./features/checkins";

const isBrowser = typeof window !== "undefined";

const getCheckinsFromStorage = () => {
  if (!isBrowser) return { checkinsList: [] };

  const raw = localStorage.getItem("checkins");
  if (!raw || raw === "undefined") return { checkinsList: [] };

  try {
    const parsed = JSON.parse(raw);
    // Old or hand-edited data might not have the expected shape — fall back to empty.
    return Array.isArray(parsed?.checkinsList) ? parsed : { checkinsList: [] };
  } catch {
    return { checkinsList: [] };
  }
};

const preloadedState = {
  checkins: getCheckinsFromStorage(),
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
if (isBrowser) {
  store.subscribe(() => {
    localStorage.setItem("checkins", JSON.stringify(store.getState().checkins));
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
