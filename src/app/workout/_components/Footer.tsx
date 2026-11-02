import { ArrowRightIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { useWorkoutSessionStore } from "@/src/store/workoutSession";
import Timer from "./Timer";

export default function Footer() {
  return (
    <footer className="flex h-17.5 w-full">
      <button
        type="button"
        className="grid aspect-square h-full place-items-center"
      >
        <ListBulletIcon width={30} height={30} />
      </button>

      <div className="grid h-full w-full place-items-center font-mono text-xl font-normal">
        <Timer />
      </div>

      <button
        type="button"
        className="grid aspect-square h-full place-items-center"
        onClick={() => {
          useWorkoutSessionStore.getState().nextStep();
        }}
      >
        <ArrowRightIcon width={30} height={30} />
      </button>
    </footer>
  );
}
