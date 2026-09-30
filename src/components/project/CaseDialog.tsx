"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  titleId: string;
  labels: { kicker: string; close: string };
  mode: "intercepted" | "page";
  homeHref: string;
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

  const focusTrigger = useCallback(() => {
    document
      .getElementById(`card-${slug}`)
      ?.querySelector<HTMLElement>(`a[href$="/cases/${slug}"]`)
      ?.focus({ preventScroll: true });
  }, [slug]);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (document.activeElement === document.body) focusTrigger();
    };
  }, [focusTrigger]);

  const close = useCallback(() => {
    ref.current?.close();
    if (mode === "intercepted") {
      router.back();
    } else {
      window.history.replaceState(window.history.state, "", homeHref);
    }
    focusTrigger();
    if (mode === "page") {
      document
        .getElementById(`card-${slug}`)
        ?.scrollIntoView({ block: "center" });
    }
  }, [mode, router, homeHref, slug, focusTrigger]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent text-fg backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:m-auto sm:h-[min(92dvh,960px)] sm:max-w-3xl"
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
        <div
          tabIndex={0}
          role="region"
          aria-labelledby={titleId}
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-8 focus-visible:outline-offset-[-4px] sm:px-8"
        >
          {children}
        </div>
      </div>
    </dialog>
  );
}
