import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type SetItem = {
  done: boolean;
  stats: { value: number; name: string }[];
};

interface WorkoutState {
  currentSet: number;
  currentExercise: number;
  currentStat: number;
  workout: SetItem[][];

  // Actions
  setCurrentSet: (value: number) => void;
  offsetCurrentSet: (offset: number) => void;
  setCurrentExercise: (value: number) => void;
  setHighlightedStat: (value: number) => void;
  updateValue: (value: number) => void;
  nextStep: () => void;
}

const EMPTY_SETS: SetItem[] = [];
const EMPTY_STATS: SetItem["stats"] = [];

export const selectExercise = (s: WorkoutState) =>
  s.workout[s.currentExercise] ?? EMPTY_SETS;

export const selectActiveStats = (s: WorkoutState) =>
  s.workout[s.currentExercise]?.[s.currentSet]?.stats ?? EMPTY_STATS;

export const selectActiveValue = (s: WorkoutState) =>
  selectActiveStats(s)[s.currentStat]?.value ?? 0;

export const useWorkoutStore = create<WorkoutState>()(
  immer((set, get) => ({
    currentSet: 1,
    currentExercise: 1,
    currentStat: 0,

    workout: [
      [],
      [
        {
          stats: [
            { name: "weight", value: 65 },
            { name: "reps", value: 15 },
          ],
          done: true,
        },
        {
          stats: [
            { name: "weight", value: 65 },
            { name: "reps", value: 15 },
          ],
          done: false,
        },
        {
          stats: [
            { name: "weight", value: 65 },
            { name: "reps", value: 15 },
          ],
          done: false,
        },
        {
          stats: [
            { name: "weight", value: 65 },
            { name: "reps", value: 15 },
          ],
          done: false,
        },
        {
          stats: [
            { name: "weight", value: 65 },
            { name: "reps", value: 15 },
          ],
          done: false,
        },
        {
          stats: [
            { name: "weight", value: 65 },
            { name: "reps", value: 15 },
          ],
          done: false,
        },
      ],
      [],
      [],
      [],
      [],
    ],

    setCurrentSet: (value) => set({ currentSet: value }),

    offsetCurrentSet: (offset) => {
      const { currentExercise, currentSet, workout } = get();
      const currentSets = workout[currentExercise] || [];
      const newSet = currentSet + offset;
      const clampedSet = Math.max(0, Math.min(newSet, currentSets.length - 1));
      set({ currentSet: clampedSet });
    },

    setCurrentExercise: (value) => set({ currentExercise: value }),

    setHighlightedStat: (value) => set({ currentStat: value }),

    updateValue: (value) =>
      set((state) => {
        const stat =
          state.workout[state.currentExercise]?.[state.currentSet]?.stats[
            state.currentStat
          ];
        if (stat) stat.value = value;
      }),

    nextStep: () => {
      const { currentExercise, currentSet, currentStat, workout } = get();
      const updatedWorkout = [...workout];

      let updatedStat = currentStat;
      let updatedSet = currentSet;
      let updatedExercise = currentExercise;

      if (
        (updatedWorkout[currentExercise]?.[currentSet]?.stats.length ?? 0) - 1 >
        currentStat
      ) {
        updatedStat++;
      } else {
        updatedWorkout[currentExercise][currentSet].done = true;
        updatedStat = 0;

        if ((updatedWorkout[currentExercise]?.length ?? 0) - 1 > currentSet) {
          updatedSet++;
        } else {
          if (updatedWorkout.length - 1 > currentExercise) {
            updatedExercise++;
          } else {
            // TODO: finished workout
          }
        }
      }

      set({
        currentStat: updatedStat,
        currentSet: updatedSet,
        currentExercise: updatedExercise,
      });
    },
  })),
);
