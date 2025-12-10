import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = {
  theme: "light" | "dark" | null;
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<Theme>()(
  persist(
    (set) => ({
      theme: null,
      setTheme: (theme: "light" | "dark") => set({ theme }),
    }),
    {
      name: "theme-store",
    }
  )
);