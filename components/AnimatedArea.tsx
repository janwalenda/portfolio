"use client";

import type { Technology } from "@/sanity.types";
import { H2 } from "./ui/heading";
import { TechCard } from "./TechCard";

interface AnimatedAreaProps {
  title?: string;
  subtitle?: string;
  technologies?: Technology[];
}

export default function AnimatedArea({
  title,
  subtitle,
  technologies,
}: AnimatedAreaProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-base-200">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {(title || subtitle) && (
          <div className="text-center mb-12 h-screen flex flex-col items-center justify-center snap-center">
            {title && <H2 className="text-4xl font-bold mb-4">{title}</H2>}
            {subtitle && (
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div role="list" className="contents">
          {technologies.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
