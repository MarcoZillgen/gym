"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_TEMPLATES } from "@/src/data/mock";
import { useWorkoutSessionStore } from "@/src/store/workoutSession";
import type { WorkoutTemplate } from "@/src/types/workout";
import Header from "./_components/Header";

export default function Home() {
  const [workouts, _setWorkouts] = useState<WorkoutTemplate[]>(MOCK_TEMPLATES);

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />

      <div className="flex w-full flex-1 flex-col place-items-center gap-4">
        {workouts.map((wt) => (
          <WorkoutTemplatePreview key={wt.id} wt={wt} />
        ))}
      </div>
    </div>
  );
}
interface WorkoutTemplatePreviewProps {
  wt: WorkoutTemplate;
}

function WorkoutTemplatePreview({ wt }: WorkoutTemplatePreviewProps) {
  const startWorkout = useWorkoutSessionStore((s) => s.startWorkout);
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        startWorkout(wt);
        router.replace("/workout");
      }}
      className="grid w-3/4 place-items-center rounded-2xl bg-bg-subtle p-4"
    >
      {wt.name}
    </button>
  );
}
