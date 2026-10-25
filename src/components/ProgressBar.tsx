import { cn } from "@/src/lib/cn";
import { useWorkoutStore } from "@/src/store/workout";

export default function ProgressBar() {
  const current = useWorkoutStore((state) => state.currentExercise);
  const segments = useWorkoutStore((state) => state.workout.length);

  return (
    <div className="flex w-full gap-2 px-2 py-1">
      {Array.from({ length: segments }).map((_, i) => (
        <ProgressSegment
          // biome-ignore lint/suspicious/noArrayIndexKey: segment fixed
          key={`segment-${i}`}
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
