"use client";

import { Button } from "./ui/button";
import { useSearchStore } from "@/store/search";
import { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Search() {
  const { open, setOpen } = useSearchStore();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => setOpen(!open)}
      aria-label={open ? "Suche schließen" : "Suche öffnen"}
      aria-expanded={open}
      aria-haspopup="dialog"
    >
      <Icon icon="heroicons:magnifying-glass" className="size-5" aria-hidden />
      <kbd className="hidden md:inline kbd kbd-primary" aria-hidden>
        Cmd + K
      </kbd>
    </Button>
  );
}
