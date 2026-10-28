import { cn } from "@/src/lib/cn";

interface RecoveryBarsProps {
  restDays: number;
  name: string;
}

export default function RecoveryBars({ restDays, name }: RecoveryBarsProps) {
  return (
    <div className="flex justify-between">
      <div className="flex h-2 w-4/5 gap-2 self-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className={cn(
              "w-full rounded-xs",
              i < restDays ? "bg-primary" : "bg-bg-subtle",
            )}
            // biome-ignore lint/suspicious/noArrayIndexKey: static
            key={`${name}-${i}`}
          />
        ))}
      </div>
      <span className="text-base text-text-standard uppercase">{name}</span>
    </div>
  );
}
