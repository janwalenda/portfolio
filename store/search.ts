import { create } from "zustand";
import { persist } from "zustand/middleware";

type Search = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useSearchStore = create<Search>()(
  persist(
    (set) => ({
      open: false,
      setOpen: (open: boolean) => set({ open }),
    }),
    {
      name: "search-store",
    }
  )
);