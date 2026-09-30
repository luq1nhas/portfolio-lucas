"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * Marca com data-revealed cada bloco [data-reveal] quando ele entra na tela
 * (uma vez só). Blocos que surgem depois (troca de idioma, navegação) também
 * são observados, para nunca ficarem ocultos.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    const observeAll = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));

    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
