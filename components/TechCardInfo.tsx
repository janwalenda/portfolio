"use client";

import { motion, type MotionValue } from "motion/react";
import type { Technology } from "@/sanity.types";

export function TechCardInfo({
  tech,
  y,
  levelColor,
}: {
  tech: Technology;
  y: MotionValue<number> | number;
  levelColor?: string;
}) {
  return (
    <div className="mt-12 md:mt-0 relative md:absolute md:left-[calc(50%+140px)] md:top-1/2 md:-translate-y-1/2 w-full max-w-xs px-4 md:px-0 flex justify-center md:block pointer-events-none md:pointer-events-auto">
      <motion.div
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
        className="text-center md:text-left w-full pointer-events-auto"
      >
        <div className="space-y-3 bg-base-200/50 backdrop-blur-sm p-4 rounded-box md:bg-transparent md:backdrop-blur-none md:p-0 border border-base-content md:border-none md:shadow-none">
          <div>
            <span className="text-base-content/50 text-sm uppercase tracking-wider">
              Level
            </span>
            <p className={`text-2xl font-bold ${levelColor}`}>{tech.level}</p>
          </div>
          <div>
            <span className="text-base-content/50 text-sm uppercase tracking-wider">
              Experience
            </span>
            <p className="text-xl font-semibold">{tech.experience}</p>
          </div>
          {tech.projects && tech.projects.length > 0 && (
            <div>
              <span className="text-base-content/50 text-sm uppercase tracking-wider">
                Projects
              </span>
              <ul className="mt-1 space-y-1">
                {tech.projects.map((project) => (
                  <li
                    key={project}
                    className="text-base-content/80 text-sm flex items-center justify-center md:justify-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
