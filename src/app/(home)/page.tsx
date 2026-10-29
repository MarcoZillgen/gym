"use client";

import {
  ChevronRightIcon,
  Pencil1Icon,
  PlayIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MOCK_HISTORY, MOCK_TEMPLATES } from "@/src/data/mock";
import { formatAgo, formatDuration } from "@/src/lib/format";
import { useWorkoutSessionStore } from "@/src/store/workoutSession";
import Header from "./_components/Header";
import RecoveryBars from "./_components/RecoveryBars";
import { Section, SectionBody, SectionHeader } from "./_components/Section";
import WeekActivity from "./_components/WeekActivity";

const sortedHistory = MOCK_HISTORY.toSorted((a, b) =>
  b.startDate.localeCompare(a.startDate),
);

export default function Home() {
  const templates = MOCK_TEMPLATES;
  const router = useRouter();
  const startWorkout = useWorkoutSessionStore((s) => s.startWorkout);

  // null on server + first client render to avoid hydration mismatch
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

  return (
    <>
      <Header />

      <main className="flex min-h-0 flex-1 flex-col gap-5 pb-6">
        <Section className="shrink-0 gap-3">
          <SectionHeader
            sectionTitle="statistics"
            Icon={ChevronRightIcon}
            onClick={() => {
              /* TODO */
            }}
            aria-label="open statistics"
          />
          <WeekActivity />
          <RecoveryBars restDays={1} name="upper" />
          <RecoveryBars restDays={2} name="lower" />
          <RecoveryBars restDays={2} name="core" />
        </Section>

        <Section className="min-h-0 flex-1">
          <SectionHeader
            sectionTitle="History"
            Icon={ChevronRightIcon}
            onClick={() => {
              /* TODO */
            }}
            aria-label="open history"
          />

          <SectionBody className="min-h-0 overflow-y-auto">
            {sortedHistory.map((h) => (
              <button
                type="button"
                key={h.id}
                className="flex w-full justify-between py-3 text-left"
                onClick={() => {
                  /* TODO */
                }}
                aria-label={`open ${h.name} history`}
              >
                <span className="self-center text-lg font-medium">
                  {h.name}
                </span>
                <div className="flex flex-col text-right text-xs">
                  <span>{formatDuration(h.startDate, h.endDate)}</span>
                  <span>{now ? formatAgo(h.startDate, now) : "\u00A0"}</span>
                </div>
              </button>
            ))}
          </SectionBody>
        </Section>

        <Section className="shrink-0">
          <SectionHeader
            sectionTitle="workout presets"
            Icon={PlusCircledIcon}
            onClick={() => {
              /* TODO */
            }}
            aria-label="create new workout preset"
          />

          <SectionBody>
            {templates.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-3"
              >
                <span className="text-lg font-medium">{t.name}</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      /* TODO */
                    }}
                    aria-label={`Edit ${t.name}`}
                    className="p-1 opacity-50 hover:opacity-100"
                  >
                    <Pencil1Icon width={24} height={24} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      startWorkout(t);
                      router.replace("/workout");
                    }}
                    aria-label={`Start ${t.name}`}
                    className="p-1 text-primary"
                  >
                    <PlayIcon width={24} height={24} />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between py-3">
              <span className="text-lg font-medium">Blank Workout</span>
              <button
                type="button"
                onClick={() => {
                  startWorkout();
                  router.replace("/workout");
                }}
                aria-label="Start blank workout"
                className="p-1 text-text-standard"
              >
                <PlayIcon width={24} height={24} />
              </button>
            </div>
          </SectionBody>
        </Section>
      </main>
    </>
  );
}
