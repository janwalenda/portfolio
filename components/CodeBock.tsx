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
    <pre className="relative flex flex-row">
      <code className="flex-1">{value.code}</code>
      <Button variant="default"
        className="sticky right-2 top-2 z-10 transition-all duration-300 swap swap-rotate"
        onClick={handleClick}>
        <input type="checkbox" checked={copied} onChange={() => { }} />
        <Icon icon="heroicons:check" className="size-6 swap-on" />
        <Icon icon="heroicons:clipboard-document" className="size-6 swap-off" />
      </Button>
    </pre>
  )
}