"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * Trilha da linha do tempo: preenche em verde conforme a rolagem avança
 * pela seção. Decorativa (aria-hidden); com movimento reduzido fica cheia.
 */
export function TimelineRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const reduce = useReducedMotion();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-y-0 left-0 w-px bg-border"
    >
      <motion.div
        style={reduce ? undefined : { scaleY }}
        className="h-full w-full origin-top bg-signal"
      />
    </div>
  );
}
