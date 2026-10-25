"use client";

import {
  ArrowRightIcon,
  Cross2Icon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import ProgressBar from "@/src/components/ProgressBar";
import { useWorkoutStore } from "@/src/store/workout";
import WheelComplex from "./_components/WheelComplex";

export default function Home() {
  const nextStep = useWorkoutStore((state) => state.nextStep);

  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-100">
      <header className="flex h-17.5 w-full text-zinc-900">
        <button
          type="button"
          className="grid aspect-square h-full place-items-center"
        >
          <Cross2Icon width={30} height={30} />
        </button>

        <div className="grid h-full w-full place-items-center text-xl font-normal">
          Crunch Machine
        </div>

        <div className="grid aspect-square h-full place-items-center"></div>
      </header>

      <WheelComplex className="flex-1" />

      <ProgressBar />

      <footer className="flex h-17.5 w-full text-zinc-900">
        <button
          type="button"
          className="grid aspect-square h-full place-items-center"
        >
          <ListBulletIcon width={30} height={30} />
        </button>

        <div className="grid h-full w-full place-items-center text-xl font-normal">
          22:45
        </div>

        <button
          type="button"
          className="grid aspect-square h-full place-items-center"
          onClick={() => {
            nextStep();
          }}
        >
          <ArrowRightIcon width={30} height={30} />
        </button>
      </footer>
    </div>
  );
}
