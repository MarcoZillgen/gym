import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import RecoveryBars from "./RecoveryBars";
import { Section, SectionHeader } from "./Section";
import WeekActivity from "./WeekActivity";

export default function StatisticsSection() {
  const router = useRouter();

  return (
    <Section className="shrink-0 gap-3">
      <SectionHeader
        sectionTitle="statistics"
        Icon={ChevronRightIcon}
        onClick={() => {
          router.replace("/statistics");
        }}
        aria-label="open statistics"
      />
      <WeekActivity />
      <RecoveryBars restDays={1} name="upper" />
      <RecoveryBars restDays={2} name="lower" />
      <RecoveryBars restDays={2} name="core" />
    </Section>
  );
}
