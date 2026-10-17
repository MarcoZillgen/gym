"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import InputWheel from "../../components/InputWheel";
import SetWheel from "./SetWheel";
import StatWheel from "./StatWheel";

interface WheelComplexProps {
  currentSet: number;
  setCurrentSet: Dispatch<SetStateAction<number>>;
  workout: { weight: number; reps: number; done: boolean }[][];
  setWorkout: Dispatch<
    SetStateAction<{ weight: number; reps: number; done: boolean }[][]>
  >;
  currentExercise: number;
}

export default function WheelComplex({
  currentSet,
  setCurrentSet,
  workout,
  currentExercise,
}: WheelComplexProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [highlightedStat, setHighlightedStat] = useState<number>(0);

  const sets: boolean[] = [];
  const repsStats: number[] = [];
  const weightStats: number[] = [];
  workout[currentExercise].forEach((set) => {
    sets.push(set.done);
    repsStats.push(set.reps);
    weightStats.push(set.weight);
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 30) {
      if (diff > 0 && currentSet < sets.length - 1) {
        setCurrentSet(currentSet + 1);
      } else if (diff < 0 && currentSet > 0) {
        setCurrentSet(currentSet - 1);
      }
    }
    setTouchStart(null);
  };

  return (
    <div className="flex h-full items-center justify-center pl-5">
      <div
        className="w-full h-full flex items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <TitleAligner>
          <SetWheel
            sets={sets}
            current={currentSet}
            setCurrent={(s) => {
              setCurrentSet(s);
            }}
          />
        </TitleAligner>

        <TitleAligner title="Reps" className="flex flex-col w-full">
          <StatWheel
            stats={repsStats}
            current={currentSet}
            setCurrent={(s) => {
              setCurrentSet(s);
            }}
            selected={highlightedStat === 0}
            select={() => {
              setHighlightedStat(0);
            }}
          />
        </TitleAligner>

        <TitleAligner title="Weight" className="flex flex-col w-full">
          <StatWheel
            stats={weightStats}
            current={currentSet}
            setCurrent={(s) => {
              setCurrentSet(s);
            }}
            selected={highlightedStat === 1}
            select={() => {
              setHighlightedStat(1);
            }}
          />
        </TitleAligner>
      </div>

      <div className="w-24 shrink-0 h-full grid place-items-center">
        <InputWheel value={0} min={0} max={0} changeValue={() => {}} />
      </div>
    </div>
  );
}

interface TitleAligner {
  children: React.ReactNode;
  className: string;
  title?: string;
}

function TitleAligner({ children, title, className }: TitleAligner) {
  return (
    <div className={className}>
      {title !== undefined ? (
        <span className="w-full grid place-items-center text-zinc-500 h-6 text-xl">
          {title}
        </span>
      ) : (
        <span className="h-6" />
      )}

      {children}

      <span className="h-6" />
    </div>
  );
}
