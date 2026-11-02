import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface SettingsState {
  theme: "dark" | "light";
  toggleTheme: (theme?: "dark" | "light") => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    immer((set) => ({
      theme: "dark",
      toggleTheme: (theme) =>
        set((state) => {
          if (theme) state.theme = theme;
          else state.theme = state.theme === "dark" ? "light" : "dark";

          document.documentElement.classList.toggle(
            "dark",
            state.theme === "dark",
          );
        }),
    })),
    {
      name: "workout-settings-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
