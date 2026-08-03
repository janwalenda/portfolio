"use client";

import { Icon } from "@iconify/react";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef } from "react";
import type { Technology } from "@/sanity.types";
import { H2 } from "./ui/heading";
import { TechCardInfo } from "./TechCardInfo";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function getLevelColor(level: Technology["level"]) {
  if (level === "Beginner") return "text-info";
  if (level === "Intermediate") return "text-warning";
  if (level === "Advanced") return "text-success";
  if (level === "Expert") return "text-primary";
}

export function TechCard({ tech }: { tech: Technology }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const translateZRaw = useTransform(scrollYProgress, [0, 1], [500, 0]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const yRaw = useParallax(scrollYProgress, 100);

  return (
    <div
      ref={ref}
      role="listitem"
      className="h-screen w-full flex flex-col items-center justify-center relative"
      style={{ perspective: "1200px" }}
      id={tech.name}
    >
      <motion.div
        style={{
          translateZ: reduce ? 0 : translateZRaw,
          opacity: reduce ? 1 : opacityRaw,
        }}
        className="flex items-center justify-center z-10"
      >
        <H2 className="gap-2 px-6 py-4 text-2xl font-bold flex items-center flex-col">
          <span className="flex items-center gap-2">
            {tech.icon?.name && (
              <Icon
                icon={tech.icon.name}
                className="size-6 hover:animate-spin"
              />
            )}
            {tech.name}
          </span>
          <motion.div
            className="h-1 bg-primary rounded-box w-full"
            style={{ scaleX }}
          />
        </H2>
      </motion.div>
      <TechCardInfo
        tech={tech}
        y={reduce ? 0 : yRaw}
        levelColor={getLevelColor(tech.level)}
      />
    </div>
  );
}
