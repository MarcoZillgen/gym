import type { WorkoutHistory, WorkoutTemplate } from "../types/workout";

export const MOCK_TEMPLATES: WorkoutTemplate[] = [
  {
    id: "template-upper-1",
    name: "Upper Body A",
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
    id: "template-upper-2",
    name: "Upper Body B",
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

export const MOCK_HISTORY: WorkoutHistory[] = [
  {
    id: "history-1",
    templateId: "template-upper-1",
    name: "Upper Body A",
    startDate: "2026-10-27T10:00:00Z",
    endDate: "2026-10-27T11:05:00Z",
  },
  {
    id: "history-2",
    templateId: "template-lower-1",
    name: "Lower & Core",
    startDate: "2026-10-24T14:30:00Z",
    endDate: "2026-10-24T15:08:00Z",
  },
  {
    id: "history-3",
    templateId: "template-upper-2",
    name: "Upper Body B",
    startDate: "2026-10-23T09:15:00Z",
    endDate: "2026-10-23T10:11:00Z",
  },
];
