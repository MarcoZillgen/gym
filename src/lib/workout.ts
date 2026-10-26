import type { WorkoutSession, WorkoutTemplate } from "../types/workout";

export function generateSessionByTemplate(wt: WorkoutTemplate): WorkoutSession {
  const ws = {
    id: crypto.randomUUID(),
    templateId: wt.id,
    startDate: new Date().toISOString(),
    currentExercise: 0,
    exercises: wt.exercises.map((ex) => ({
      id: crypto.randomUUID(),
      name: ex.name,
      statNames: ex.statNames,
      done: false,
      currentSet: 0,
      sets: Array.from({ length: ex.defaultSetAmount }, () => ({
        id: crypto.randomUUID(),
        done: false,
        currentStat: 0,
        statValues: new Array(ex.statNames.length).fill(0),
      })),
    })),
  };

  return ws;
}

export function generateBlankSession() {
  const ws = {
    id: crypto.randomUUID(),
    startDate: new Date().toISOString(),
    currentExercise: 0,
    exercises: [],
  };

  return ws;
}
