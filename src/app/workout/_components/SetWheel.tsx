"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import DisplayWheel from "@/src/components/DisplayWheel";
import { cn } from "@/src/lib/cn";
import { selectExercise, useWorkoutStore } from "@/src/store/workout";

export default function SetWheel() {
  const currentSet = useWorkoutStore((s) => s.currentSet);
  const exercise = useWorkoutStore(selectExercise);
  const offsetCurrentSet = useWorkoutStore((s) => s.offsetCurrentSet);

  const items = Array.from({ length: exercise.length }, (_, i) => i + 1);

  return (
    <DisplayWheel
      className="-my-10"
      items={items}
      current={currentSet}
      onSlotClick={offsetCurrentSet}
      renderItem={(item, position) => {
        const isDone = exercise[item - 1]?.done ?? false;
        return (
          <span
            className={cn(
              "text-xl transition-all",
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
