import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { indexedDBStorage } from "../db/indexedDBStorage";
import type { WorkoutTemplate } from "../types/workout";

interface WorkoutTemplatesState {
  templates: WorkoutTemplate[]; // user sorted
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  addTemplate: (workout: WorkoutTemplate) => void;
}

export const useWorkoutTemplatesStore = create<WorkoutTemplatesState>()(
  persist(
    immer((set) => ({
      templates: [],
      hasHydrated: false,

      setHasHydrated: (hydrated) =>
        set((state) => {
          state.hasHydrated = hydrated;
        }),

      addTemplate: (workout) =>
        set((state) => {
          state.templates.unshift(workout);
        }),
    })),
    {
      name: "workout-templates-storage",
      storage: createJSONStorage(() => indexedDBStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
