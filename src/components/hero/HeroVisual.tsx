"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { canRender3D } from "./canRender3D";

// three.js só é baixado quando a cena vai de fato ser exibida.
const AgentNetwork3D = dynamic(() => import("./AgentNetwork3D"), {
  ssr: false,
});

/**
 * Visual do hero. A rede em SVG (children) aparece de imediato; em aparelhos
 * aptos, a cena 3D carrega quando o navegador fica ocioso e a substitui com
 * um fade quando o primeiro quadro está pronto.
 */
export function HeroVisual({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      if (canRender3D()) setEnabled(true);
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div aria-hidden className={cn("relative", className)}>
      <div
        className={cn(
          "h-full transition-opacity duration-700",
          ready && "opacity-0",
        )}
      >
        {children}
      </div>
      {enabled && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <AgentNetwork3D onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
