"use client"

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface DisplayWheelProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: T[];
    current: number;
    renderItem: (item: T | null, position: number) => React.ReactNode;
}

export default function DisplayWheel<T>({ items, current, renderItem,className,...props }: DisplayWheelProps<T>) {
    const slots = [-2, -1, 0, 1, 2];

    return (
    <div className={cn("flex flex-col items-center justify-center gap-5 select-none",className)} {...props}>
      {slots.map((offset) => {
        const itemIndex = current + offset;
        const item = items[itemIndex] ?? null;

        return (
          <motion.div
            key={itemIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid place-items-center"
          >
            {renderItem(item, offset)}
          </motion.div>
        );
      })}
    </div>
    );
}
