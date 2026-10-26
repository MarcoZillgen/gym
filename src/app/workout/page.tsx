"use client";

import ProgressBar from "@/src/components/ProgressBar";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import WheelComplex from "./_components/WheelComplex";

export default function Workout() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />

      <WheelComplex className="flex-1" />

      <ProgressBar />

      <Footer />
    </div>
  );
}
