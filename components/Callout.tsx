"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const toneStyles = {
  info: "border-info bg-info/10 text-base-content",
  tip: "border-success bg-success/10 text-base-content",
  warning: "border-warning bg-warning/10 text-base-content",
} as const;

const toneIcons = {
  info: "heroicons:information-circle",
  tip: "heroicons:light-bulb",
  warning: "heroicons:exclamation-triangle",
} as const;

type CalloutTone = keyof typeof toneStyles;

export default function Callout({
  value,
}: {
  value: {
    tone?: CalloutTone;
    title?: string;
    body?: string;
  };
}) {
  const tone = value.tone && value.tone in toneStyles ? value.tone : "info";

  return (
    <aside
      className={cn(
        "my-6 flex gap-3 rounded-box border-l-4 px-4 py-3",
        toneStyles[tone],
      )}
      role="note"
    >
      <Icon icon={toneIcons[tone]} className="mt-0.5 size-5 shrink-0" />
      <div className="space-y-1">
        {value.title && <p className="font-semibold">{value.title}</p>}
        {value.body && <p className="text-sm leading-relaxed">{value.body}</p>}
      </div>
    </aside>
  );
}
