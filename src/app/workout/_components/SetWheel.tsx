"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import DisplayWheel from "@/src/components/DisplayWheel";
import { cn } from "@/src/lib/cn";
import {
  selectActiveExerciseSession,
  selectCurrentSetIndex,
  useWorkoutSessionStore,
} from "@/src/store/workoutSession";

export default function SetWheel() {
  const currentSet = useWorkoutSessionStore(selectCurrentSetIndex);
  const exercise = useWorkoutSessionStore(selectActiveExerciseSession);
  const offsetCurrentSet = useWorkoutSessionStore((s) => s.offsetCurrentSet);

  const sets = exercise?.sets ?? [];
  const items = Array.from({ length: sets.length }, (_, i) => i + 1);

  return (
    <DisplayWheel
      className="-my-10"
      items={items}
      current={currentSet}
      onSlotClick={offsetCurrentSet}
      renderItem={(item, position) => {
        const isDone = sets[item - 1]?.done ?? false;
        return (
          <span
            className={cn(
              "w-6 text-xl transition-all",
              isDone
                ? "rounded-md bg-primary-subtle p-1 text-text-primary"
                : "text-text-standard",
              position === 0 && "font-medium",
            )}
          >
            {isDone ? <CheckIcon className="size-4 scale-150" /> : item}
          </span>
        );
      }}
    />
  );
}
