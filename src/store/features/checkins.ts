import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CheckInDto } from "@/api/services/types";

// Define a type for the slice state
interface CheckinsListState {
  checkinsList: Array<CheckInDto>;
}

// Define the initial state using that type
const initialState: CheckinsListState = {
  checkinsList: [],
};

//TODO mocked data
const formatedDate = new Date().toLocaleDateString("en-CA");

const backendDataMocked = {
  date: formatedDate,
  createdAt: new Date().toISOString(),
};

export const checkinsListSlice = createSlice({
  name: "checkinsList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCheckinItem(
      state,
      action: PayloadAction<
        Pick<
          CheckInDto,
          "id" | "situation" | "emotion" | "autoThoughts" | "behavior"
        >
      >,
    ) {
      state.checkinsList.push({ ...action.payload, ...backendDataMocked });
    },
    setCheckinsList(state, action: PayloadAction<CheckInDto>) {
      state.checkinsList.push(action.payload);
    },
    clearCheckinsList(state) {
      state.checkinsList = [];
    },
  },
});

export const { setCheckinsList, clearCheckinsList, addCheckinItem } =
  checkinsListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCheckinsList = (state: RootState) => state.checkins;

export default checkinsListSlice.reducer;
