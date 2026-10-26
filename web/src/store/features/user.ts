import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserDto } from "@/api/services/types";

// Define a type for the slice state
interface UserState {
  currentUser: {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
  } | null;
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDto>) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
