"use client";

import { useTranslations } from "next-intl";
import { useCallback, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// O filtro vive na URL (?tag=…): é a fonte da verdade e permite compartilhar o link.
const FILTER_EVENT = "portfolio:filterchange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(FILTER_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(FILTER_EVENT, onChange);
  };
}

type Item = { id: string; tags: string[]; node: ReactNode };
type TagOption = { id: string; label: string };

type Props = {
  items: Item[];
  tags: TagOption[];
  /** Parâmetro da URL que guarda o filtro, para o link poder ser compartilhado. */
  param: string;
  gridClassName: string;
};

export function FilterableGrid({ items, tags, param, gridClassName }: Props) {
  const t = useTranslations("Project");
  const getSnapshot = useCallback(
    () => new URLSearchParams(window.location.search).get(param),
    [param],
  );
  // No servidor (HTML estático) não há filtro.
  const fromUrl = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const active = tags.some((tag) => tag.id === fromUrl) ? fromUrl : null;

  function select(tag: string | null) {
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set(param, tag);
    else url.searchParams.delete(param);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(FILTER_EVENT));
  }

  const visible = active ? items.filter((i) => i.tags.includes(active)) : items;
  const options = [{ id: null, label: t("filterAll") }, ...tags];

  return (
    <>
      {tags.length > 1 && (
        <div
          className="mb-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("filterLabel")}
        >
          {options.map((opt) => {
            const pressed = active === opt.id;
            return (
              <button
                key={opt.id ?? "all"}
                type="button"
                aria-pressed={pressed}
                onClick={() => select(opt.id)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition-colors",
                  pressed
                    ? "border-tag bg-tag text-bg"
                    : "border-border text-muted hover:border-tag/60 hover:text-fg",
                )}
              >
                {opt.label}
              </button>
            );
          })}
          <p
            aria-live="polite"
            className="ml-auto font-mono text-xs text-muted"
          >
            {t("filterCount", { count: visible.length })}
          </p>
        </div>
      )}
      <div className={gridClassName}>
        {visible.map((item) => (
          <div key={item.id} className="contents">
            {item.node}
          </div>
        ))}
      </div>
    </>
  );
}
