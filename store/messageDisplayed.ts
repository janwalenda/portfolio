import { create } from "zustand";
import { persist } from "zustand/middleware";

type MessageDisplayed = {
  messageDisplayed: boolean;
  setMessageDisplayed: (messageDisplayed: boolean) => void;
}

export const useMessageDisplayedStore = create<MessageDisplayed>()(
  persist(
    (set) => ({
      messageDisplayed: false,
      setMessageDisplayed: (messageDisplayed: boolean) => set({ messageDisplayed }),
    }),
    {
      name: "season-event-store",
    }
  )
);