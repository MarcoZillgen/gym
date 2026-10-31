import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Navbar } from "@/src/components/Navbar";

export default function Header() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <Navbar asChild>
      <header className="flex justify-between">
        <div className="flex gap-2 p-6">
          <h1 className="text-xl font-bold">GYM</h1>
          <span className="self-end pb-0.5 text-xs">by Marco Zillgen</span>
        </div>
        <button
          type="button"
          className="grid place-items-center p-6"
          onClick={toggleDark}
        >
          {isDark ? (
            <SunIcon width={24} height={24} />
          ) : (
            <MoonIcon width={24} height={24} />
          )}
        </button>
      </header>
    </Navbar>
  );
}
