"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  titleId: string;
  labels: { kicker: string; close: string };
  /**
   * "intercepted": aberto por clique na landing (rota interceptada) → fechar volta no histórico.
   * "page": acesso direto pela URL (landing renderizada por trás) → fechar só troca a URL.
   */
  mode: "intercepted" | "page";
  /** URL da landing no idioma atual, usada ao fechar no modo "page". */
  homeHref: string;
  /** Card de origem, para devolver o foco e a rolagem ao fechar. */
  slug: string;
};

export function CaseDialog({
  children,
  titleId,
  labels,
  mode,
  homeHref,
  slug,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = useCallback(() => {
    if (mode === "intercepted") {
      router.back();
    } else {
      ref.current?.close();
      window.history.replaceState(window.history.state, "", homeHref);
    }
    // Devolve o foco ao botão "Ver detalhes" do card de origem.
    requestAnimationFrame(() => {
      const card = document.getElementById(`card-${slug}`);
      card
        ?.querySelector<HTMLElement>(`a[href$="/cases/${slug}"]`)
        ?.focus({ preventScroll: true });
      if (mode === "page") card?.scrollIntoView({ block: "center" });
    });
  }, [mode, router, homeHref, slug]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault(); // Esc: fecha pelo mesmo caminho do botão
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close(); // clique no fundo escurecido
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent text-fg opacity-100 transition-[opacity,translate] duration-300 backdrop:bg-black/60 backdrop:backdrop-blur-sm motion-reduce:transition-none sm:m-auto sm:h-[min(92dvh,960px)] sm:max-w-3xl starting:open:translate-y-4 starting:open:opacity-0"
    >
      <div className="flex h-full flex-col overflow-hidden border-border bg-bg sm:rounded-2xl sm:border">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3 sm:px-8">
          <p className="font-mono text-xs tracking-wider text-muted uppercase">
            {labels.kicker}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-8">
          {children}
        </div>
      </div>
    </dialog>
  );
}
