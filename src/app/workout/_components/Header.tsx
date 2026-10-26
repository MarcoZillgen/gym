import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Navbar } from "@/src/components/Navbar";
import {
  selectActiveExerciseSession,
  useWorkoutSessionStore,
} from "@/src/store/workoutSession";

export default function Header() {
  const exercise = useWorkoutSessionStore(selectActiveExerciseSession);
  const router = useRouter();

  return (
    <Navbar asChild>
      <header>
        <button
          type="button"
          onClick={() => router.replace("/")}
          className="grid aspect-square h-full place-items-center"
        >
          <Cross2Icon width={30} height={30} />
        </button>

        <div className="grid h-full w-full place-items-center text-xl font-normal">
          {exercise?.name}
        </div>

        <div className="grid aspect-square h-full place-items-center"></div>
      </header>
    </Navbar>
  );
}
