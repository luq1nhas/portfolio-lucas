"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Todas as animações do Motion respeitam prefers-reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
