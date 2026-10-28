import { Navbar } from "@/src/components/Navbar";

export default function Header() {
  return (
    <Navbar asChild>
      <header className="flex gap-2 p-6">
        <h1 className="text-xl font-bold">GYM</h1>
        <span className="self-end pb-0.5 text-xs">by Marco Zillgen</span>
      </header>
    </Navbar>
  );
}
