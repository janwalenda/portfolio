"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button"
import { Icon } from "@iconify/react"
import { useState } from "react"

export default function CodeBlock({
  value
}: {
  value: {
    code: string
  }
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <pre className="overflow-x-auto max-w-full p-4 rounded-lg">
        <code>{value.code}</code>
      </pre>
      <Button variant="default"
        className="absolute right-2 top-2 z-10 transition-all duration-300 swap swap-rotate"
        onClick={handleClick}>
        <input type="checkbox" checked={copied} onChange={() => { }} />
        <Icon icon="heroicons:check" className="size-6 swap-on" />
        <Icon icon="heroicons:clipboard-document" className="size-6 swap-off" />
      </Button>
    </div>
  )
}