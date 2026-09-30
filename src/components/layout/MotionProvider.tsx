"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () =>
  import("./motionFeatures").then((mod) => mod.default);

/**
 * Motion carregado sob demanda: o bundle inicial leva só o núcleo e os
 * componentes `m.*`; os recursos de animação chegam depois (LazyMotion).
 * `strict` impede o uso acidental de `motion.*`, que traria tudo de volta.
 * Todas as animações respeitam prefers-reduced-motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
