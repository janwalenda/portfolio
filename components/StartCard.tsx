"use client";
import { useRef } from "react";
import { H2 } from "./ui/heading";

export function StartCard() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="
        text-center
        mb-12
        h-screen
        flex
        flex-col
        items-center
        justify-center
        snap-center
      ">
      <H2 className="text-4xl font-bold mb-4">
        <span>Skills</span> & <span>Technologies</span>
      </H2>
      <p className="text-lg text-base-content/70">
        Tools and frameworks I work with
      </p>
    </div>
  );
}
