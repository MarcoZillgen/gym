"use client";

import DisplayWheel from "@/src/components/DisplayWheel";
import { cn } from "@/src/lib/cn";
import { selectExercise, useWorkoutStore } from "@/src/store/workout";

interface StatWheelProps {
  statIndex: number; // 0 for weight, 1 for reps, etc.
}

export default function StatWheel({ statIndex }: StatWheelProps) {
  const currentSet = useWorkoutStore((s) => s.currentSet);
  const selected = useWorkoutStore((s) => s.currentStat === statIndex);
  const exercise = useWorkoutStore(selectExercise);
  const offsetCurrentSet = useWorkoutStore((s) => s.offsetCurrentSet);
  const setHighlightedStat = useWorkoutStore((s) => s.setHighlightedStat);

  const values = exercise.map((set) => set.stats[statIndex]?.value ?? 0);

  return (
    <DisplayWheel
      className="-my-10 w-full"
      items={values}
      current={currentSet}
      highlight={
        <div
          className={cn(
            "-z-10 h-12 w-3/4 rounded-lg bg-purple-300 transition-opacity",
            selected ? "opacity-100" : "opacity-0",
          )}
        />
      }
      onSlotClick={(position) => {
        setHighlightedStat(statIndex);
        offsetCurrentSet(position);
      }}
      renderItem={(value, position) => (
        <span
          className={cn(
            "grid h-full place-items-center px-2 text-xl transition-all",
            position === 0 && "text-4xl",
            position === 0 && selected && "text-purple-900",
            position > 0 && "text-zinc-500",
          )}
        >
          {value}
        </span>
      )}
    />
  );
}
