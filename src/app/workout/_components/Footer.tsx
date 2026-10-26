import { ArrowRightIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { useWorkoutSessionStore } from "@/src/store/workoutSession";

export default function Footer() {
  const nextStep = useWorkoutSessionStore((state) => state.nextStep);

  return (
    <footer className="flex h-17.5 w-full">
      <button
        type="button"
        className="grid aspect-square h-full place-items-center"
      >
        <ListBulletIcon width={30} height={30} />
      </button>

      <div className="grid h-full w-full place-items-center text-xl font-normal">
        {}
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
  );
}
