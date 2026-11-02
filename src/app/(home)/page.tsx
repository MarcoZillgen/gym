"use client";

import Header from "./_components/Header";
import HistorySection from "./_components/HistorySection";
import StatisticsSection from "./_components/StatisticsSection";
import TemplateSection from "./_components/TemplateSection";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex min-h-0 flex-1 flex-col gap-5 pb-6">
        <StatisticsSection />
        <HistorySection />
        <TemplateSection />
      </main>
    </>
  );
}
