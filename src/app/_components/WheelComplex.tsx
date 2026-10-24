"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/src/lib/cn";
import {
  selectActiveStats,
  selectActiveValue,
  useWorkoutStore,
} from "@/src/store/workout";
import InputWheel from "../../components/InputWheel";
import SetWheel from "./SetWheel";
import StatWheel from "./StatWheel";
import TitleAligner from "./TitleAligner";

interface WheelComplexProps {
  className?: string;
}

export default function WheelComplex({ className }: WheelComplexProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const statNames = useWorkoutStore(
    useShallow((s) => selectActiveStats(s).map((stat) => stat.name)),
  );
  const activeStatValue = useWorkoutStore(selectActiveValue);

  const offsetCurrentSet = useWorkoutStore((s) => s.offsetCurrentSet);
  const updateValue = useWorkoutStore((s) => s.updateValue);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 30) offsetCurrentSet(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <div
      className={cn("flex h-full items-center justify-center pl-5", className)}
    >
      <div
        className="flex h-full w-full items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <TitleAligner>
          <SetWheel />
        </TitleAligner>

        {statNames.map((name, index) => (
          <TitleAligner
            key={name}
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            className="w-full"
          >
            <StatWheel statIndex={index} />
          </TitleAligner>
        ))}
      </div>

      <div className="grid h-full w-24 shrink-0 place-items-center">
        <InputWheel
          className="h-65 w-full"
          value={activeStatValue}
          min={0}
          max={100}
          changeValue={updateValue}
        />
      </div>
    </div>
  );
}
