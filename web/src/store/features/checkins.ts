import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CheckInDto } from "@/api/services/types";

export type NewCheckIn = Omit<CheckInDto, "id" | "createdAt">;

interface CheckinsListState {
  checkinsList: Array<CheckInDto>;
}

const initialState: CheckinsListState = {
  checkinsList: [],
};

export const checkinsListSlice = createSlice({
  name: "checkins",
  initialState,
  reducers: {
    addCheckinItem: {
      reducer(state, action: PayloadAction<CheckInDto>) {
        state.checkinsList.push(action.payload);
      },
      // `prepare` runs before the reducer, so the reducer stays pure.
      // id and createdAt are generated here — per entry, not once per app load.
      prepare(newCheckIn: NewCheckIn) {
        return {
          payload: {
            ...newCheckIn,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    clearCheckinsList(state) {
      state.checkinsList = [];
    },
  },
});

export const { clearCheckinsList, addCheckinItem } = checkinsListSlice.actions;

export const checkinsSelectors = {
  selectCheckinsList: (state: RootState) => state.checkins.checkinsList,

  getItemByDate: (state: RootState, date: string) =>
    state.checkins.checkinsList.filter((item) => item.date === date),
};

export default checkinsListSlice.reducer;
