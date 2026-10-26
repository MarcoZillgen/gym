import { cn } from "@/src/lib/cn";
import { useWorkoutSessionStore } from "@/src/store/workoutSession";

export default function ProgressBar() {
  const workout = useWorkoutSessionStore((state) => state.workout);
  if (!workout || workout.exercises.length === 0) return null;

  const current = workout.currentExercise;

  return (
    <div className="flex w-full gap-2 px-2 py-1">
      {workout.exercises.map((ex, i) => (
        <ProgressSegment
          key={ex.id}
          status={current === i ? "progressing" : current < i ? "todo" : "done"}
        />
      ))}
    </div>
  );
}

interface ProgressSegmentProps {
  status: "done" | "progressing" | "todo";
}

function ProgressSegment({ status }: ProgressSegmentProps) {
  return (
    <div
      className={cn(
        "h-2 w-full flex-1 rounded-xs transition-colors",
        status === "done" && "bg-primary",
        status === "progressing" && "bg-primary-alt dark:bg-text-primary-alt",
        status === "todo" && "bg-bg-subtle",
      )}
    />
  );
}
