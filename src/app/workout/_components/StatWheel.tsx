"use client";

import { useShallow } from "zustand/react/shallow";
import DisplayWheel from "@/src/components/DisplayWheel";
import { cn } from "@/src/lib/cn";
import {
  selectCurrentSetIndex,
  selectCurrentStatIndex,
  useWorkoutSessionStore,
} from "@/src/store/workoutSession";

interface StatWheelProps {
  statIndex: number; // 0 for weight, 1 for reps, etc.
}

export default function StatWheel({ statIndex }: StatWheelProps) {
  const currentSet = useWorkoutSessionStore(selectCurrentSetIndex);
  const selected = useWorkoutSessionStore(
    (s) => selectCurrentStatIndex(s) === statIndex,
  );

  const values = useWorkoutSessionStore(
    useShallow((s) => {
      const ex = s.workout?.exercises[s.workout.currentExercise];
      return ex?.sets.map((set) => set.statValues[statIndex] ?? 0) ?? [];
    }),
  );

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
      onSlotClick={(offset) => {
        const store = useWorkoutSessionStore.getState();
        store.offsetCurrentSet(offset);
        store.setCurrentStat(statIndex);
      }}
      renderItem={(value, offset) => (
        <span
          className={cn(
            "grid h-full place-items-center px-2 text-xl transition-all",
            offset === 0 && "text-4xl",
            offset === 0 && selected && "text-text-primary-alt",
          )}
        >
          {value}
        </span>
      )}
    />
  );
}
