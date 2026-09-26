"use client";

import { useEffect } from "react";

/**
 * A demo do Nexus roda no plano gratuito do Render, que "dorme" sem uso.
 * Uma requisição leve assim que a página fica ociosa acorda o servidor
 * antes de o recrutador clicar em "Ver demo".
 */
export function WakeDemo({ url }: { url: string }) {
  useEffect(() => {
    const ping = () => {
      fetch(url, { mode: "no-cors", cache: "no-store" }).catch(() => {
        // Falha silenciosa: é só um aquecimento.
      });
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(ping, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(ping, 2000);
    return () => clearTimeout(id);
  }, [url]);

  return null;
}
