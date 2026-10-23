"use client";

import {
  type CSSProperties,
  type MouseEvent,
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
  const targetRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || lastRef.current === value) return;
    const isMount = lastRef.current === null;
    lastRef.current = value;
    if (!isMount) targetRef.current = max - value;
    el.scrollTo({
      top: (max - value) * PITCH,
      behavior: isMount ? "instant" : "auto",
    });
  }, [value, max]);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    if (targetRef.current !== null) {
      if (Math.abs(top - targetRef.current * PITCH) <= PITCH / 2)
        targetRef.current = null;
      return;
    }
    const index = Math.max(0, Math.min(count - 1, Math.round(top / PITCH)));
    const next = max - index;
    if (next !== lastRef.current) {
      lastRef.current = next;
      changeValue(next);
    }
  };

  const interrupt = (
    e: WheelEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
  ) => {
    if (targetRef.current === null) return;
    targetRef.current = null;
    e.currentTarget.scrollTo({
      top: e.currentTarget.scrollTop,
      behavior: "instant",
    });
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const centerY = rect.height / 2;

    if (Math.abs(clickY - centerY) < 16) return;

    if (clickY < centerY) {
      const next = Math.min(max, value + 1);
      if (next !== value) {
        targetRef.current = max - next;
        changeValue(next);
        el.scrollTo({ top: (max - next) * PITCH, behavior: "instant" });
      }
    } else {
      const next = Math.max(min, value - 1);
      if (next !== value) {
        targetRef.current = max - next;
        changeValue(next);
        el.scrollTo({ top: (max - next) * PITCH, behavior: "instant" });
      }
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: mobile app doesnt need keyboard
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
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center overflow-y-auto overscroll-contain snap-y snap-proximity scrollbar-none motion-safe:scroll-smooth touch-pan-y cursor-pointer",
        "before:block before:h-[calc(50%-8px)] before:w-full before:shrink-0",
        "after:block after:h-[calc(50%-8px)] after:w-full after:shrink-0",
        className,
      )}
      style={containerMask}
    >
      {Array.from({ length: count }, (_, i) => {
        const tick = max - i;
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
