import type { Pending } from "@content/types";
import { showPlaceholders } from "@content/index";

/**
 * Marca visível de informação pendente, no formato {{NOME}}.
 * Só existe em desenvolvimento: em produção não renderiza nada.
 */
export function Placeholder({
  value,
  className,
}: {
  value: Pending;
  className?: string;
}) {
  if (!showPlaceholders) return null;
  return (
    <mark
      className={`rounded bg-yellow-300 px-1.5 py-0.5 font-mono text-xs text-black ${className ?? ""}`}
    >
      {`{{${value.pending}}}`}
    </mark>
  );
}
