import { cn } from "@/lib/cn";

interface ProgressBarProps {
  segments: number;
  current: number;
}

export default function ProgressBar({ segments, current }: ProgressBarProps) {
  return (
    <div className="flex gap-2 py-1 px-2 w-full">
      {Array.from({ length: segments }).map((_, i) => (
        <ProgressSegment
          // biome-ignore lint/suspicious/noArrayIndexKey: segment fixed
          key={`segment-${i}`}
          status={current === i ? "progressing" : current < i ? "todo" : "done"}
        />
      ))}
    </div>
  );
}

interface ProgressSegmentProps {
  status: "done" | "progressing" | "todo";
}

function ProgressSegment({ status }: ProgressSegmentProps) {
  return (
    <div
      className={cn(
        "h-2 flex-1 rounded-xs transition-colors w-full",
        status === "done" && "bg-purple-500",
        status === "progressing" && "bg-purple-300",
        status === "todo" && "bg-zinc-300",
      )}
    />
  );
}
