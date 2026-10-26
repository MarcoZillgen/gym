"use client";

import DisplayWheel from "@/src/components/DisplayWheel";
import { cn } from "@/src/lib/cn";
import {
  selectActiveExerciseSession,
  selectCurrentSetIndex,
  selectCurrentStatIndex,
  useWorkoutSessionStore,
} from "@/src/store/workoutSession";

interface StatWheelProps {
  statIndex: number; // 0 for weight, 1 for reps, etc.
}

export default function MyStatComponent({ statIndex }: StatWheelProps) {
  const currentSet = useWorkoutSessionStore(selectCurrentSetIndex);
  const currentStat = useWorkoutSessionStore(selectCurrentStatIndex);
  const exercise = useWorkoutSessionStore(selectActiveExerciseSession);
  const selected = currentStat === statIndex;

  const setCurrentStat = useWorkoutSessionStore((s) => s.setCurrentStat);
  const setCurrentSet = useWorkoutSessionStore((s) => s.setCurrentSet);

  const values =
    exercise?.sets.map((set) => set.statValues[statIndex] ?? 0) ?? [];

  return (
    <DisplayWheel
      className="-my-10 w-full"
      items={values}
      current={currentSet}
      highlight={
        <div
          className={cn(
            "-z-10 h-12 w-3/4 rounded-lg bg-primary-alt transition-opacity",
            selected ? "opacity-100" : "opacity-0",
          )}
        />
      }
      onSlotClick={(position) => {
        setCurrentStat(statIndex);
        setCurrentSet(position);
      }}
      renderItem={(value, position) => (
        <span
          className={cn(
            "grid h-full place-items-center px-2 text-xl transition-all",
            position === 0 && "text-4xl",
            position === 0 && selected && "text-text-primary-alt",
          )}
        >
          {value}
        </span>
      )}
    />
  );
}
