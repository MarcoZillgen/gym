"use client";

import { useEffect, useState } from "react";

export default function Timer({ startDate }: { startDate: string }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const startTimestamp = new Date(startDate).getTime();

    // Calculate immediately to avoid 1-second delay on mount
    setElapsedSeconds(Math.floor((Date.now() - startTimestamp) / 1000));

    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimestamp) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return <>{formatTime(elapsedSeconds)}</>;
}
