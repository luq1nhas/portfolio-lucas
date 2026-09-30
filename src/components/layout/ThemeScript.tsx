"use client";

import { useLayoutEffect } from "react";

/** Aplica o tema salvo (padrão: escuro). A escolha do visitante fica em localStorage. */
function applyStoredTheme() {
  let theme = "dark";
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {
    // Armazenamento bloqueado: fica o padrão.
  }
  document.documentElement.dataset.theme = theme;
}

const script = `(${applyStoredTheme.toString()})()`;

/**
 * Tema sem "piscar", seguindo o padrão "Preventing flash before hydration" do Next.js:
 *
 * - No HTML do servidor, o script é executável e aplica o tema durante o parse,
 *   antes da primeira pintura.
 * - Quando o React renderiza no cliente (a troca de idioma recria o layout raiz
 *   e o <html>), o script vira `text/plain`: não roda, e o React não emite o
 *   aviso de <script> em componente. `suppressHydrationWarning` aceita a
 *   diferença de `type`. Nesse caso quem reaplica o tema é o useLayoutEffect,
 *   que também roda antes da pintura.
 */
export function ThemeScript() {
  useLayoutEffect(applyStoredTheme, []);

  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
