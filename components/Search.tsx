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
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])


  return (
    <Button variant="ghost" size="sm" onClick={() => setOpen(!open)}>
      <kbd className="hidden md:inline kbd kbd-primary">Cmd + K</kbd>
      <Icon icon="heroicons:magnifying-glass" className="size-5 md:hidden" />
    </Button>
  )
}
