"use client";

import { useEffect, useState } from "react";
import { useWorkoutSessionStore } from "@/src/store/workoutSession";

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function Timer() {
  const startTime = useWorkoutSessionStore((s) => s.workout?.startDate);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startTime) return;
    const startTimestamp = new Date(startTime).getTime();
    setElapsedSeconds(Math.floor((Date.now() - startTimestamp) / 1000));
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimestamp) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  if (!startTime) return "00:00";
  return formatTime(elapsedSeconds);
}
