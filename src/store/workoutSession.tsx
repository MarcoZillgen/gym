import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { indexedDBStorage } from "../db/indexedDBStorage";
import clamp from "../lib/clamp";
import {
  generateBlankSession,
  generateSessionByTemplate,
} from "../lib/workout";
import type {
  ExerciseSession,
  SetSession,
  WorkoutSession,
  WorkoutTemplate,
} from "../types/workout";

const withActiveWorkout = (
  state: WorkoutSessionState,
  fn: (workout: WorkoutSession) => void,
): void => {
  const w = state.workout;
  if (!w) return;
  fn(w);
};

const withActiveExercise = (
  state: WorkoutSessionState,
  fn: (workout: WorkoutSession, exercise: ExerciseSession) => void,
): void => {
  withActiveWorkout(state, (w) => {
    const ex = w.exercises[w.currentExercise];
    if (!ex) return;
    fn(w, ex);
  });
};

const withActiveSet = (
  state: WorkoutSessionState,
  fn: (
    workout: WorkoutSession,
    exercise: ExerciseSession,
    set: SetSession,
  ) => void,
): void => {
  withActiveExercise(state, (w, ex) => {
    const st = ex.sets[ex.currentSet];
    if (!st) return;
    fn(w, ex, st);
  });
};

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

  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;

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
  // current set = b
  setDoneState: (b: boolean) => void;
  // update currently highlighted value
  updateValue: (value: number) => void;
  // step to next stat, set, exercise
  nextStep: () => void;
}

export const useWorkoutSessionStore = create<WorkoutSessionState>()(
  persist(
    immer((set) => ({
      workout: null,
      hasHydrated: false,

      setHasHydrated: (hydrated: boolean) =>
        set((state) => {
          state.hasHydrated = hydrated;
        }),

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
        set((state) =>
          withActiveExercise(state, (_w, ex) => {
            ex.currentSet = clamp(
              0,
              ex.currentSet + offset,
              ex.sets.length - 1,
            );
          }),
        ),

      setCurrentSet: (n) =>
        set((state) =>
          withActiveExercise(state, (_w, ex) => {
            ex.currentSet = clamp(0, n, ex.sets.length - 1);
          }),
        ),

      setCurrentExercise: (n) =>
        set((state) =>
          withActiveWorkout(state, (w) => {
            w.currentExercise = clamp(0, n, w.exercises.length - 1);
          }),
        ),

      setCurrentStat: (n) =>
        set((state) =>
          withActiveSet(state, (_w, ex, st) => {
            st.currentStat = clamp(0, n, ex.statNames.length - 1);
          }),
        ),

      setDoneState: (d: boolean) =>
        set((state) =>
          withActiveSet(state, (_w, _ex, st) => {
            st.done = d;
          }),
        ),

      updateValue: (value) =>
        set((state) =>
          withActiveSet(state, (_w, _ex, st) => {
            st.statValues[st.currentStat] = value;
          }),
        ),

      nextStep: () =>
        set((state) => {
          withActiveSet(state, (w, ex, st) => {
            // stat step
            if (st.statValues.length - 1 > st.currentStat) {
              st.currentStat++;
              return;
            }
            // was last stat => jump set
            st.done = true;
            st.currentStat = 0;
            // set step
            if (ex.sets.length - 1 > ex.currentSet) {
              ex.currentSet++;
              return;
            }
            // was last set => jump exercise
            ex.done = true;
            ex.currentSet = 0;

            if (w.exercises.length - 1 > w.currentExercise) {
              // exercise step
              w.currentExercise++;
            } else {
              // was lust exercise => workout done
              w.endDate = new Date().toISOString();
              // TODO: trigger completion
            }
          });
        }),
    })),
    {
      name: "workout-session-storage",
      storage: createJSONStorage(() => indexedDBStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
