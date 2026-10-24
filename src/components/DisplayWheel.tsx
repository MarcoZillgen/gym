"use client";

import { motion } from "framer-motion";
import { cn } from "@/src/lib/cn";

const SLOTS = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

const MASK =
  "linear-gradient(to bottom, transparent 20%, black 40%, black 60%, transparent 80%)";

interface DisplayWheelProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: T[];
  current: number;
  renderItem: (item: T, position: number) => React.ReactNode;
  onSlotClick?: (position: number) => void;
  reach?: number;
  highlight?: React.ReactNode;
}

export default function DisplayWheel<T>({
  items,
  current,
  renderItem,
  onSlotClick,
  reach = 2,
  highlight,
  className,
  style,
  ...props
}: DisplayWheelProps<T>) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-5 select-none",
        className,
      )}
      style={{ maskImage: MASK, WebkitMaskImage: MASK, ...style }}
      {...props}
    >
      {highlight && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {highlight}
        </div>
      )}

      {SLOTS.map((offset) => {
        const index = current + offset;
        const hasItem = index >= 0 && index < items.length;
        const isCenter = offset === 0;

        return (
          <motion.div
            key={index}
            layout="position"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid w-full place-items-center"
          >
            {hasItem ? (
              <button
                type="button"
                disabled={Math.abs(offset) > reach}
                onClick={() => onSlotClick?.(offset)}
                className={cn(
                  "grid place-items-center transition-all disabled:pointer-events-none",
                  isCenter ? "h-12" : "h-6",
                )}
              >
                {renderItem(items[index], offset)}
              </button>
            ) : (
              <div className={isCenter ? "h-12" : "h-6"} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
