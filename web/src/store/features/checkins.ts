import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CheckInDto } from "@/api/services/types";

export type NewCheckIn = Omit<CheckInDto, "id" | "createdAt">;

export type DayGroup = {
  date: string;
  entries: CheckInDto[];
};

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
    removeCheckinItem(state, action: PayloadAction<string>) {
      state.checkinsList = state.checkinsList.filter((item) => item.id !== action.payload);
    },
    clearCheckinsList(state) {
      state.checkinsList = [];
    },
  },
});

export const { clearCheckinsList, addCheckinItem, removeCheckinItem } = checkinsListSlice.actions;

const selectCheckinsList = (state: RootState) => state.checkins.checkinsList;

// createSelector memoizes: these only recompute when the list itself changes,
// so components don't re-render on unrelated store updates.

/** Newest day first; inside a day, newest entry first. */
const selectEntriesGroupedByDay = createSelector([selectCheckinsList], (list): DayGroup[] => {
  const sorted = [...list].sort((a, b) =>
    a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date),
  );

  const groups: DayGroup[] = [];
  for (const entry of sorted) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === entry.date) {
      lastGroup.entries.push(entry);
    } else {
      groups.push({ date: entry.date, entries: [entry] });
    }
  }
  return groups;
});

const selectDatesWithEntries = createSelector([selectCheckinsList], (list): string[] => [
  ...new Set(list.map((entry) => entry.date)),
]);

/** answer → how many entries used it, for one multi-value field. */
const countAnswers = (list: CheckInDto[], getAnswers: (entry: CheckInDto) => string[]): Record<string, number> => {
  const usage: Record<string, number> = {};
  for (const entry of list) {
    for (const answer of getAnswers(entry)) {
      if (answer) usage[answer] = (usage[answer] ?? 0) + 1;
    }
  }
  return usage;
};

/** Emotion name → how many times used. Drives "most used first" in the picker. */
const selectEmotionUsage = createSelector([selectCheckinsList], (list) =>
  countAnswers(list, (entry) => entry.emotion.map((emotion) => emotion.name)),
);
const selectPlaceUsage = createSelector([selectCheckinsList], (list) => countAnswers(list, (entry) => [entry.place]));
const selectPeopleUsage = createSelector([selectCheckinsList], (list) => countAnswers(list, (entry) => entry.people));
const selectReactionUsage = createSelector([selectCheckinsList], (list) => countAnswers(list, (entry) => entry.reactions));

/** The user's last few distinct thoughts — often the same thought comes back, one tap to reuse it. */
const selectRecentThoughts = createSelector([selectCheckinsList], (list): string[] => {
  const newestFirst = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const thoughts = newestFirst.map((entry) => entry.autoThought.trim()).filter((thought) => thought !== "");
  return [...new Set(thoughts)].slice(0, 4);
});

export const checkinsSelectors = {
  selectCheckinsList,
  selectEntriesGroupedByDay,
  selectDatesWithEntries,
  selectEmotionUsage,
  selectPlaceUsage,
  selectPeopleUsage,
  selectReactionUsage,
  selectRecentThoughts,
  selectEntryById: (state: RootState, id: string) => state.checkins.checkinsList.find((item) => item.id === id),
};

export default checkinsListSlice.reducer;
