"use client";
import { Icon, IconifyIcon } from "@iconify/react";
import { Badge } from "./ui/badge";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

export default function AnimatedArea() {
  // Tech stack for the developer
  const technologies: { name: string; icon: string }[] = [
    { name: "React", icon: "logos:react" },
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Vue.js", icon: "logos:vue" },
    { name: "Nuxt.js", icon: "logos:nuxt" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "Sanity CMS", icon: "simple-icons:sanity" },
  ];

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section className="w-full py-20 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <StartCard />
        {technologies.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
        <motion.div style={{ scaleX }} />
      </div>
    </section>
  )
}

function TechCard({ tech }: { tech: { name: string; icon: string } }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  // Z-axis fly-in: starts far away (-1000) and comes to front (0)
  const translateZ = useTransform(scrollYProgress, [0, 1], [1000, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={ref}
      className="h-screen w-full flex items-center justify-center snap-center"
      style={{ perspective: "1200px" }}
      id={tech.name}
    >
      <motion.div
        style={{
          translateZ,
          opacity,
        }}
        className="flex items-center justify-center flex-row"
      >
        <Badge
          size="xl"
          badgeStyle="outline"
          className="gap-2 px-6 py-4 bg-base-200 shadow-xl"
        >
          <Icon icon={tech.icon} className="size-6 hover:animate-spin" />
          {tech.name}
        </Badge>
      </motion.div>
    </div>
  )
}

function StartCard() {
  return (
    <div className="text-center mb-12 h-screen flex flex-col items-center justify-center snap-center">
      <h2 className="text-4xl font-bold mb-4">
        <span className="animate-pulse">Skills</span> & <span>Technologies</span>
      </h2>
      <p className="text-lg text-base-content/70">
        Tools and frameworks I work with
      </p>
    </div>
  )
}