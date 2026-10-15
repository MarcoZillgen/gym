"use client"

import DisplayWheel from "@/components/DisplayWheel";
import { cn } from "@/lib/cn";

interface StatWheelProps {
  stats: number[];
  current: number;
  setCurrent: (c:number) => void;
  selected: boolean;
  select: () => void;
}

export default function StatWheel({ stats, current, setCurrent, select, selected }: StatWheelProps) {
  const renderItem = (item: number | null, position: number): React.ReactNode => {
    if (item === null) return <div className="h-6"/>;

    const className = cn(
      "text-xl h-6 grid place-items-center transition-all px-2",
      position === 0 && "h-12 text-4xl",
      position === 0 && selected && "bg-purple-300 text-purple-900 rounded-lg",
      Math.abs(position) === 1 && "opacity-75",
      Math.abs(position) === 2 && "opacity-50",
      position > 0 && "text-zinc-500"
    );

    return <div className={className} onClick={() => { select(); setCurrent(current + position); }}>{item}</div>;
  };

  return <DisplayWheel className="w-full" items={stats} current={current} renderItem={renderItem} />;
}
