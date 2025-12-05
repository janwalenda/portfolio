"use client";
import { Button } from "./ui/button"
import { Icon } from "@iconify/react"

export default function CodeBlock({
  value
}: {
  value: {
    code: string
  }
}) {
  const handleClick = () => navigator.clipboard.writeText(value.code);

  return (
    <pre className="relative">
      <Button variant="secondary" className="absolute top-2 right-2" onClick={handleClick}>
        <Icon icon="heroicons:clipboard-document" className="size-6" />
        <span className="sr-only">Copy</span>
      </Button>
      <code>{value.code}</code>
    </pre>
  )
}