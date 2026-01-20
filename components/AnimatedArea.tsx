"use client";

import { Icon } from "@iconify/react";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { useRef } from "react"
import { StartCard } from "./StartCard";
import { Technology } from "@/sanity.types";
import { H2 } from "./ui/heading";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

interface AnimatedAreaProps {
  title?: string
  subtitle?: string
  technologies?: Technology[]
}

export default function AnimatedArea({ title, subtitle, technologies }: AnimatedAreaProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full bg-base-200"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <H2 className="text-4xl font-bold mb-4">{title}</H2>}
            {subtitle && (
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <StartCard />
        <div role="list" className="contents">
          {technologies.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Level to color mapping
function getLevelColor(level: Technology["level"]) {
  switch (level) {
    case "Beginner":
      return "text-info"
    case "Intermediate":
      return "text-warning"
    case "Advanced":
      return "text-success"
    case "Expert":
      return "text-primary"
  }
}

function TechCard({ tech }: { tech: Technology }) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Z-axis fly-in for badge
  const translateZRaw = useTransform(scrollYProgress, [0, 1], [500, 0])
  const opacityRaw = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const translateZ = shouldReduceMotion ? 0 : translateZRaw
  const opacity = shouldReduceMotion ? 1 : opacityRaw

  // Parallax effect for the info panel (moves slower than scroll)
  const yRaw = useParallax(scrollYProgress, 100)
  const y = shouldReduceMotion ? 0 : yRaw

  return (
    <div
      ref={ref}
      role="listitem"
      className="
        h-screen 
        w-full 
        flex 
        flex-col 
        items-center 
        justify-center 
        relative 
      "
      style={{ perspective: "1200px" }}
      id={tech.name}
    >
      {/* Main Badge with fly-in effect */}
      <motion.div
        style={{
          translateZ,
          opacity,
        }}
        className="flex items-center justify-center z-10"
      >
        <H2 className="gap-2 px-6 py-4 text-2xl font-bold flex items-center flex-col">
          <span className="flex items-center gap-2">
            {tech.icon?.name && <Icon icon={tech.icon.name} className="size-6 hover:animate-spin" />}
            {tech.name}
          </span>
          <motion.div className="h-1 bg-primary rounded-box w-full" style={{ scaleX }} />
        </H2>
      </motion.div>

      {/* Info Panel Wrapper for Layout */}
      <div className="mt-12 md:mt-0 relative md:absolute md:left-[calc(50%+140px)] md:top-1/2 md:-translate-y-1/2 w-full max-w-xs px-4 md:px-0 flex justify-center md:block pointer-events-none md:pointer-events-auto">
        {/* Animated Inner Content */}
        <motion.div
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible" }}
          style={{ y }}
          className="text-center md:text-left w-full pointer-events-auto"
        >
          <div className="
            space-y-3 
            bg-base-200/50 
            backdrop-blur-sm 
            p-4 
            rounded-box 
            md:bg-transparent 
            md:backdrop-blur-none 
            md:p-0 
            border 
            border-base-content
            md:border-none 
            md:shadow-none
          ">
            {/* Experience Level */}
            <div>
              <span className="text-base-content/50 text-sm uppercase tracking-wider">
                Level
              </span>
              <p className={`text-2xl font-bold ${getLevelColor(tech.level)}`}>
                {tech.level}
              </p>
            </div>

            {/* Years of Experience */}
            <div>
              <span className="text-base-content/50 text-sm uppercase tracking-wider">
                Experience
              </span>
              <p className="text-xl font-semibold">{tech.experience}</p>
            </div>

            {/* Projects */}
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
    </div>
  )
}
