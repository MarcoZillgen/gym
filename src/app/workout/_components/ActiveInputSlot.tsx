import InputWheel from "@/src/components/InputWheel";
import {
  selectActiveValue,
  useWorkoutSessionStore,
} from "@/src/store/workoutSession";

export default function ActiveInputSlot() {
  // extracted to not force rerender of whole complex
  const activeStatValue = useWorkoutSessionStore(selectActiveValue);
  const updateValue = useWorkoutSessionStore((s) => s.updateValue);

  return (
    <InputWheel
      className="h-65 w-full"
      value={activeStatValue}
      min={0}
      max={100}
      changeValue={updateValue}
    />
  );
}
