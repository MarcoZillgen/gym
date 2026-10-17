"use client";

import {
  ArrowRightIcon,
  Cross2Icon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import WheelComplex from "./_components/WheelComplex";

export default function Home() {
  const [currentSet, setCurrentSet] = useState(3);
  const [currentExercise, setCurrentExercise] = useState(2);
  const [workout, setWorkout] = useState([
    [],
    [],
    [
      { weight: 65, reps: 15, done: true },
      { weight: 65, reps: 15, done: true },
      { weight: 65, reps: 15, done: true },
      { weight: 65, reps: 15, done: false },
      { weight: 65, reps: 15, done: false },
      { weight: 65, reps: 15, done: false },
    ],
    [],
    [],
    [],
    [],
  ]);

  return (
    <div className="bg-zinc-200 w-screen h-screen flex flex-col">
      <header className="w-full h-17.5 flex text-zinc-900">
        <div className="aspect-square h-full grid place-items-center">
          <Cross2Icon width={30} height={30} />
        </div>

        <div className="w-full h-full grid place-items-center text-xl font-normal">
          Crunch Machine
        </div>

        <div className="aspect-square h-full grid place-items-center">
          <Cross2Icon width={30} height={30} />
        </div>
      </header>

      <div className="flex-1">
        <WheelComplex
          currentSet={currentSet}
          setCurrentSet={setCurrentSet}
          workout={workout}
          currentExercise={currentExercise}
          setWorkout={setWorkout}
        />
      </div>

      <ProgressBar segments={workout.length} current={currentExercise} />

      <footer className="w-full h-17.5 flex text-zinc-900">
        <div className="aspect-square h-full grid place-items-center">
          <ListBulletIcon width={30} height={30} />
        </div>

        <div className="w-full h-full grid place-items-center text-xl font-normal">
          22:45
        </div>

        <button
          type="button"
          className="aspect-square h-full grid place-items-center"
          onClick={() => {}}
        >
          <ArrowRightIcon width={30} height={30} />
        </button>
      </footer>
    </div>
  );
}
