"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import DisplayWheel from "@/src/components/DisplayWheel";
import { cn } from "@/src/lib/cn";
import {
  selectCurrentSetIndex,
  useWorkoutSessionStore,
} from "@/src/store/workoutSession";

export default function SetWheel() {
  const currentSet = useWorkoutSessionStore(selectCurrentSetIndex);
  const offsetCurrentSet = useWorkoutSessionStore((s) => s.offsetCurrentSet);
  const setDoneState = useWorkoutSessionStore((s) => s.setDoneState);
  const setDones = useWorkoutSessionStore(
    useShallow((s) => {
      const ex = s.workout?.exercises[s.workout.currentExercise];
      return ex?.sets.map((set) => set.done) ?? [];
    }),
  );

  const items = useMemo(
    () => Array.from({ length: setDones.length }, (_, i) => i + 1),
    [setDones.length],
  );

  return (
    <DisplayWheel
      className="-my-10"
      items={items}
      current={currentSet}
      onSlotClick={(offset: number) => {
        offsetCurrentSet(offset);
        setDoneState(false);
      }}
      renderItem={(item, position) => {
        const isDone = setDones[item - 1] ?? false;

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
            {isDone ? <CheckIcon className="scale-150" /> : item}
          </span>
        );
      }}
    />
  );
}
