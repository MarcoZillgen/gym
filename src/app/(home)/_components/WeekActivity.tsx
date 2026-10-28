import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/src/lib/cn";

export default function WeekActivity() {
  return (
    <div className="flex h-8 w-full gap-3">
      {Array.from({ length: 7 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static i
        <Day active={i === 2 || i === 0} key={i} />
      ))}
    </div>
  );
}

function Day({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "grid h-full w-full place-items-center rounded-lg border text-primary",
        active ? "border-primary/35 bg-primary/15" : "border-bg-subtle",
      )}
    >
      {active && <CheckIcon width={24} height={24} />}
    </div>
  );
}
