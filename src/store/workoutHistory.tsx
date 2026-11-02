import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { indexedDBStorage } from "../db/indexedDBStorage";
import type { WorkoutHistory } from "../types/workout";

interface WorkoutHistoryState {
  history: WorkoutHistory[]; // at all time chonologically sorted
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  addWorkoutToHistory: (workout: WorkoutHistory) => void;
}

export const useWorkoutHistoryStore = create<WorkoutHistoryState>()(
  persist(
    immer((set) => ({
      history: [],
      hasHydrated: false,

      setHasHydrated: (hydrated) =>
        set((state) => {
          state.hasHydrated = hydrated;
        }),

      addWorkoutToHistory: (workout) =>
        set((state) => {
          state.history.unshift(workout);
        }),
    })),
    {
      name: "workout-history-storage",
      storage: createJSONStorage(() => indexedDBStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
