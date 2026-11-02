"use client";

import { Pencil1Icon, PlayIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useWorkoutSessionStore } from "@/src/store/workoutSession";
import type { WorkoutTemplate } from "@/src/types/workout";
import { Section, SectionBody, SectionHeader } from "./Section";

export default function TemplateSection() {
  const templates: WorkoutTemplate[] = [];
  const startWorkout = useWorkoutSessionStore((s) => s.startWorkout);
  const router = useRouter();

  return (
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
          <div key={t.id} className="flex items-center justify-between py-3">
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
  );
}
