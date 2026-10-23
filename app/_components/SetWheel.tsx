"use client";

import DisplayWheel from "@/components/DisplayWheel";
import { cn } from "@/lib/cn";

interface SetWheelProps {
  sets: boolean[];
  current: number;
  setCurrent: (c: number) => void;
}

export default function SetWheel({ sets, current, setCurrent }: SetWheelProps) {
  const items = Array.from({ length: sets.length }, (_, i) => i + 1);

  const renderItem = (
    item: number | null,
    position: number,
  ): React.ReactNode => {
    if (item === null) return <div className="h-6" />;

    const isDone = sets[item - 1];

    const className = cn(
      "text-xl h-6 grid place-items-center transition-all",
      isDone && "text-purple-700",
      !isDone && "text-zinc-500",
      position === 0 && "h-12 text-xl font-medium",
      Math.abs(position) === 1 && "opacity-50",
      Math.abs(position) === 2 && "opacity-25",
      Math.abs(position) >= 3 && "opacity-0",
    );

    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          if (Math.abs(position) >= 3) return;
          setCurrent(current + position);
        }}
      >
        {item}
      </button>
    );
  };

  return (
    <DisplayWheel
      className="-my-10"
      items={items}
      current={current}
      renderItem={renderItem}
    />
  );
}
