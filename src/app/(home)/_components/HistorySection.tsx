"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatAgo, formatDuration } from "@/src/lib/format";
import { useWorkoutHistoryStore } from "@/src/store/workoutHistory";
import { Section, SectionBody, SectionHeader } from "./Section";

export default function HistorySection() {
  const history = useWorkoutHistoryStore((s) => s.history);
  const router = useRouter();

  // null on server + first client render to avoid hydration mismatch
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

  return (
    <Section className="min-h-0 flex-1">
      <SectionHeader
        sectionTitle="History"
        Icon={ChevronRightIcon}
        onClick={() => {
          router.replace("/history");
        }}
        aria-label="open history"
      />

      <SectionBody className="min-h-0 overflow-y-auto">
        {history.map((h) => (
          <button
            type="button"
            key={h.id}
            className="flex w-full justify-between py-3 text-left"
            onClick={() => {
              router.replace(`/statistics?workout=${h.id}`);
            }}
            aria-label={`open ${h.name} history`}
          >
            <span className="self-center text-lg font-medium">{h.name}</span>
            <div className="flex flex-col text-right text-xs">
              <span>{formatDuration(h.startDate, h.endDate)}</span>
              <span>{now ? formatAgo(h.startDate, now) : "\u00A0"}</span>
            </div>
          </button>
        ))}
      </SectionBody>
    </Section>
  );
}
