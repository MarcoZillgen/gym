import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import clamp from "../lib/clamp";
import {
  generateBlankSession,
  generateSessionByTemplate,
} from "../lib/workout";
import type {
  ExerciseSession,
  WorkoutSession,
  WorkoutTemplate,
} from "../types/workout";

const EMPTY_ACTIVE_STAT_NAMES: string[] = [];
export const selectActiveStatNames = (state: WorkoutSessionState): string[] => {
  if (!state.workout) return EMPTY_ACTIVE_STAT_NAMES;
  const w = state.workout;
  const ex = w.exercises[w.currentExercise];

  return ex?.statNames ?? EMPTY_ACTIVE_STAT_NAMES;
};

export const selectActiveValue = (state: WorkoutSessionState): number => {
  if (!state.workout) return 0;

  const w = state.workout;
  const ex = w.exercises[w.currentExercise];
  const st = ex?.sets[ex.currentSet];

  return st?.statValues?.[st.currentStat] ?? 0;
};

export const selectCurrentSetIndex = (state: WorkoutSessionState): number => {
  if (!state.workout) return 0;
  const ex = state.workout.exercises[state.workout.currentExercise];
  return ex?.currentSet ?? 0;
};

export const selectCurrentStatIndex = (state: WorkoutSessionState): number => {
  if (!state.workout) return 0;
  const w = state.workout;
  const ex = w.exercises[w.currentExercise];
  const set = ex?.sets[ex.currentSet];
  return set?.currentStat ?? 0;
};

export const selectActiveExerciseSession = (
  state: WorkoutSessionState,
): ExerciseSession | undefined => {
  if (!state.workout) return undefined;
  return state.workout.exercises[state.workout.currentExercise];
};

interface WorkoutSessionState {
  workout: WorkoutSession | null;

  startWorkout: (wt?: WorkoutTemplate) => void;
  endWorkout: () => void;
  // offset current set
  offsetCurrentSet: (offset: number) => void;
  // move to nth set
  setCurrentSet: (n: number) => void;
  // move to nth exericse
  setCurrentExercise: (n: number) => void;
  // move to nth stat
  setCurrentStat: (n: number) => void;
  // update currently highlighted value
  updateValue: (value: number) => void;
  // step to next stat, set, exercise
  nextStep: () => void;
}

export const useWorkoutSessionStore = create<WorkoutSessionState>()(
  immer((set) => ({
    workout: null,

    startWorkout: (wt) =>
      set((state) => {
        state.workout = wt
          ? generateSessionByTemplate(wt)
          : generateBlankSession();
      }),

    endWorkout: () =>
      set((state) => {
        if (state.workout) {
          state.workout.endDate = new Date().toISOString();
          // TODO: save in history
        }
        state.workout = null;
      }),

    offsetCurrentSet: (offset) =>
      set((state) => {
        if (state.workout === null) return;

        const w = state.workout;
        const ex = w.exercises[w.currentExercise];
        if (!ex) return;

        ex.currentSet = clamp(0, ex.currentSet + offset, ex.sets.length - 1);
      }),

    setCurrentSet: (n) =>
      set((state) => {
        if (state.workout === null) return;

        const w = state.workout;
        const ex = w.exercises[w.currentExercise];
        if (!ex) return;

        ex.currentSet = clamp(0, n, ex.sets.length - 1);
      }),

    setCurrentExercise: (n) =>
      set((state) => {
        if (state.workout === null) return;

        const w = state.workout;

        w.currentExercise = clamp(0, n, w.exercises.length - 1);
      }),

    setCurrentStat: (n) =>
      set((state) => {
        if (state.workout === null) return;

        const w = state.workout;
        const ex = w.exercises[w.currentExercise];
        if (!ex) return;
        const st = ex.sets[ex.currentSet];
        if (!st) return;

        st.currentStat = clamp(0, n, ex.statNames.length - 1);
      }),

    updateValue: (value) =>
      set((state) => {
        if (state.workout === null) return;

        const w = state.workout;
        const ex = w.exercises[w.currentExercise];
        if (!ex) return;
        const st = ex.sets[ex.currentSet];
        if (!st) return;

        st.statValues[st.currentStat] = value;
      }),

    nextStep: () =>
      set((state) => {
        if (state.workout === null) return;

        const w = state.workout;
        const ex = w.exercises[w.currentExercise];
        if (!ex) return;

        const st = ex.sets[ex.currentSet];
        if (!st) return;

        if (st.statValues.length - 1 > st.currentStat) {
          st.currentStat++;
          return;
        }

        st.done = true;
        st.currentStat = 0;

        if (ex.sets.length - 1 > ex.currentSet) {
          ex.currentSet++;
          return;
        }

        ex.done = true;
        ex.currentSet = 0;

        if (w.exercises.length - 1 > w.currentExercise) {
          w.currentExercise++;
        } else {
          w.endDate = new Date().toISOString();
          // TODO: trigger completion
        }
      }),
  })),
);
