"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import clamp from "@/lib/clamp";
import { cn } from "@/lib/cn";

const LINE_H = 2;
const GAP = 12;
const ITEM_HEIGHT = LINE_H + GAP;
const MIN_W = 24;
const MAX_W = 72;
const MIN_SCALE = MIN_W / MAX_W;
const MIN_OPACITY = 0.15;
const MAX_DISTANCE = 6;
const SCROLL_END_FALLBACK_MS = 150;

const SUPPORTS_SCROLLEND =
  typeof window !== "undefined" && "onscrollend" in window;

const containerVars = {
  gap: GAP,
  "--s-min": MIN_SCALE,
  "--o-min": MIN_OPACITY,
} as CSSProperties;

const lineStyle: CSSProperties = { height: LINE_H, width: MAX_W };

interface InputWheelProps {
  value: number;
  min: number;
  max: number;
  changeValue: (value: number) => void;
  label?: string;
  className?: string;
}

/*
  Not using useState for performance reasons
*/

export default function InputWheel({
  value,
  min,
  max,
  changeValue,
  label,
  className,
}: InputWheelProps) {
  // scroll container
  const containerRef = useRef<HTMLDivElement>(null);
  // lines dom elements
  const itemsRef = useRef<HTMLElement[]>([]);
  // shown lines (neg init)
  const rangeRef = useRef({ from: 0, to: -1 });

  const valueRef = useRef(value);
  const lastSelectedIndexRef = useRef(value - min);
  // scroll event destinction
  const isUserScrollingRef = useRef(false);
  const programmaticRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const lines = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max],
  );

  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  const applyStyles = useCallback((pos: number) => {
    const items = itemsRef.current;
    const from = Math.max(0, Math.floor(pos - MAX_DISTANCE));
    const to = Math.min(items.length - 1, Math.ceil(pos + MAX_DISTANCE));
    const prev = rangeRef.current;

    // remove old ones except for overwrites
    for (let i = prev.from; i <= prev.to; i++) {
      if (i >= from && i <= to) continue;
      items[i]?.style.removeProperty("--o");
      items[i]?.style.removeProperty("--s");
    }

    // apply new styles (using some good looking funcs)
    for (let i = from; i <= to; i++) {
      const el = items[i];
      if (!el) continue;
      const progress = Math.min(Math.abs(i - pos) / MAX_DISTANCE, 1);
      const factor = Math.cos(progress * (Math.PI / 2));
      el.style.setProperty(
        "--o",
        String(MIN_OPACITY + (1 - MIN_OPACITY) * factor),
      );
      el.style.setProperty("--s", String(MIN_SCALE + (1 - MIN_SCALE) * factor));
    }

    rangeRef.current = { from, to };
  }, []);

  const syncToValue = useCallback(
    (v: number) => {
      // stop sync if interacting/pre-mount
      const container = containerRef.current;
      if (!container || isUserScrollingRef.current) return;

      const target = clamp(v - min, 0, lines.length - 1);
      lastSelectedIndexRef.current = target;

      const targetTop = target * ITEM_HEIGHT;
      if (Math.abs(container.scrollTop - targetTop) > 0.5) {
        // flag own write (handleScroll not treating as user input)
        programmaticRef.current = true;
        container.scrollTop = targetTop;
        requestAnimationFrame(() => {
          programmaticRef.current = false;
        });
      }
      applyStyles(target);
    },
    [min, lines.length, applyStyles],
  );

  const endUserScroll = useCallback(() => {
    isUserScrollingRef.current = false;
    syncToValue(valueRef.current);
  }, [syncToValue]);

  // init refs and style
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-line]"),
    );

    items.forEach((el) => {
      el.style.removeProperty("--o");
      el.style.removeProperty("--s");
    });

    itemsRef.current = items;
    rangeRef.current = { from: 0, to: -1 };

    const index = clamp(valueRef.current - min, 0, lines.length - 1);
    lastSelectedIndexRef.current = index;
    applyStyles(index);
  }, [min, lines.length, applyStyles]);

  // init vertical padding (resize reload)
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const pad = `${container.clientHeight / 2 - LINE_H / 2}px`;
      container.style.paddingTop = pad;
      container.style.paddingBottom = pad;
      syncToValue(valueRef.current);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, [syncToValue]);

  useEffect(() => {
    syncToValue(value);
  }, [value, syncToValue]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !SUPPORTS_SCROLLEND) return;
    container.addEventListener("scrollend", endUserScroll);
    return () => container.removeEventListener("scrollend", endUserScroll);
  }, [endUserScroll]);

  useEffect(() => () => clearTimeout(scrollEndTimerRef.current), []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const exact = container.scrollTop / ITEM_HEIGHT;
    applyStyles(exact);

    if (programmaticRef.current) return;

    isUserScrollingRef.current = true;
    if (!SUPPORTS_SCROLLEND) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = setTimeout(
        endUserScroll,
        SCROLL_END_FALLBACK_MS,
      );
    }

    const index = clamp(Math.round(exact), 0, lines.length - 1);
    if (index !== lastSelectedIndexRef.current) {
      lastSelectedIndexRef.current = index;
      changeValue(lines[index]);
      // TODO: haptics
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onScroll={handleScroll}
      className={cn(
        "relative flex flex-col items-center overflow-y-auto overscroll-contain snap-y snap-mandatory scrollbar-none",
        className,
      )}
      style={containerVars}
    >
      {lines.map((num) => (
        <div
          key={num}
          data-line
          aria-hidden="true"
          style={lineStyle}
          className="shrink-0 rounded-full bg-zinc-900 snap-center snap-always opacity-(--o,var(--o-min)) transform-[scaleX(var(--s,var(--s-min)))]"
        />
      ))}
    </div>
  );
}
