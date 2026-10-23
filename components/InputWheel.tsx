"use client";

import {
  type CSSProperties,
  type PointerEvent,
  type UIEvent,
  useLayoutEffect,
  useRef,
  type WheelEvent,
} from "react";
import { cn } from "@/lib/cn";

const PITCH = 16;

const MASK = `
  linear-gradient(to bottom, transparent 15%, black 40%, black 60%, transparent 85%),
  radial-gradient(ellipse at center, black 50%, transparent 55%)
`;
const containerMask = {
  maskImage: MASK,
  WebkitMaskImage: MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as CSSProperties;

interface InputWheelProps {
  value: number;
  min: number;
  max: number;
  changeValue: (value: number) => void;
  label?: string;
  className?: string;
}

export default function InputWheel({
  value,
  min,
  max,
  changeValue,
  label,
  className,
}: InputWheelProps) {
  const count = max - min + 1;
  const ref = useRef<HTMLDivElement>(null);
  const lastRef = useRef<number | null>(null);
  const targetRef = useRef<number | null>(null); // parent val change scroll target

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || lastRef.current === value) return; // user scroll
    const isMount = lastRef.current === null;
    lastRef.current = value;
    if (!isMount) targetRef.current = value - min;
    el.scrollTo({
      top: (value - min) * PITCH,
      behavior: isMount ? "instant" : "auto",
    });
  }, [value, min]);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    if (targetRef.current !== null) {
      if (Math.abs(top - targetRef.current * PITCH) <= PITCH / 2)
        targetRef.current = null;
      return;
    }
    const next =
      min + Math.max(0, Math.min(count - 1, Math.round(top / PITCH)));
    if (next !== lastRef.current) {
      lastRef.current = next;
      changeValue(next);
    }
  };

  // user stops auto scroll
  const interrupt = (
    e: WheelEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>,
  ) => {
    if (targetRef.current === null) return;
    targetRef.current = null;
    e.currentTarget.scrollTo({
      top: e.currentTarget.scrollTop,
      behavior: "instant",
    });
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onScroll={onScroll}
      onScrollEnd={() => (targetRef.current = null)}
      onWheel={interrupt}
      onPointerDown={interrupt}
      className={cn(
        "flex flex-col items-center overflow-y-auto overscroll-contain snap-y snap-mandatory scrollbar-none motion-safe:scroll-smooth",
        "before:block before:h-[calc(50%-8px)] before:w-full before:shrink-0",
        "after:block after:h-[calc(50%-8px)] after:w-full after:shrink-0",
        className,
      )}
      style={containerMask}
    >
      {Array.from({ length: count }, (_, i) => {
        const tick = min + i;
        return (
          <div
            key={tick}
            className="h-4 w-full shrink-0 snap-center snap-always flex items-center"
          >
            <div
              className={cn(
                "w-full rounded-full bg-zinc-900",
                tick % 5 === 0 ? "h-0.5" : "h-px opacity-50",
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
