"use client";
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
    <pre className="relative overflow-x-scroll flex flex-row">
      <code>{value.code}</code>
      <Button variant="secondary" className="sticky right-2 top-2 z-10 transition-all duration-300" onClick={handleClick}>
        <Icon icon="heroicons:clipboard-document" className="size-6" />
        <span className="sr-only">Copy</span>
        {copied && (
          <span className="animate-pulse">Copied!</span>
        )}
      </Button>
    </pre>
  )
}