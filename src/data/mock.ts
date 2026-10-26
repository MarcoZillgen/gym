import type { WorkoutTemplate } from "../types/workout";

export const MOCK_TEMPLATES: WorkoutTemplate[] = [
  {
    id: "template-upper-1",
    name: "Upper Body Hypertrophy",
    exercises: [
      {
        id: "ex-bench",
        name: "Barbell Bench Press",
        statNames: ["weight", "reps"],
        defaultSetAmount: 3,
      },
      {
        id: "ex-row",
        name: "Bent-Over Row",
        statNames: ["weight", "reps"],
        defaultSetAmount: 3,
      },
    ],
  },
  {
    id: "template-lower-1",
    name: "Leg Day Power",
    exercises: [
      {
        id: "ex-squat",
        name: "Barbell Back Squat",
        statNames: ["weight", "reps"],
        defaultSetAmount: 4,
      },
      {
        id: "ex-rdl",
        name: "Romanian Deadlift",
        statNames: ["weight", "reps"],
        defaultSetAmount: 3,
      },
    ],
  },
];
