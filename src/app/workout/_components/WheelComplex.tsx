"use client";

import { useState } from "react";
import { cn } from "@/src/lib/cn";
import {
  selectActiveStatNames,
  useWorkoutSessionStore,
} from "@/src/store/workoutSession";
import ActiveInputSlot from "./ActiveInputSlot";
import SetWheel from "./SetWheel";
import StatWheel from "./StatWheel";
import TitleAligner from "./TitleAligner";

interface WheelComplexProps {
  className?: string;
}

export default function WheelComplex({ className }: WheelComplexProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const statNames = useWorkoutSessionStore(selectActiveStatNames);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const diff = touchStart - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 30) {
      useWorkoutSessionStore.getState().offsetCurrentSet(diff > 0 ? 1 : -1);
    }

    setTouchStart(null);
  };

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center pl-5",
        className,
      )}
    >
      <div
        className="flex h-full w-full items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <TitleAligner>
          <SetWheel />
        </TitleAligner>

        {statNames.map((name, i) => (
          <TitleAligner
            key={`stat-wheel-${name}`}
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            className="w-full"
          >
            <StatWheel statIndex={i} />
          </TitleAligner>
        ))}
      </div>

      <div className="grid h-full w-24 shrink-0 place-items-center">
        <ActiveInputSlot />
      </div>
    </div>
  );
}
