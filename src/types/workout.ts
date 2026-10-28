export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: ExerciseTemplate[];
}

export interface ExerciseTemplate {
  id: string;
  name: string;
  statNames: string[];
  defaultSetAmount: number;
}

export interface WorkoutSession {
  id: string;
  name: string;
  templateId?: string;
  startDate: string;
  endDate?: string;
  currentExercise: number;
  exercises: ExerciseSession[];
}

export interface ExerciseSession {
  id: string;
  name: string;
  statNames: string[];
  done: boolean;
  currentSet: number;
  sets: SetSession[];
}

export interface SetSession {
  id: string;
  done: boolean;
  currentStat: number;
  statValues: number[];
}

export interface WorkoutHistory {
  id: string;
  name: string;
  templateId?: string;
  startDate: string;
  endDate: string;
}
