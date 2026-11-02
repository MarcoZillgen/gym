import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Navbar } from "@/src/components/Navbar";
import { useSettingsStore } from "@/src/store/settings";

export default function Header() {
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const theme = useSettingsStore((s) => s.theme);

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
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme === "dark" ? (
            <SunIcon width={24} height={24} />
          ) : (
            <MoonIcon width={24} height={24} />
          )}
        </button>
      </header>
    </Navbar>
  );
}
