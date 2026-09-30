"use client";

import { useEffect } from "react";

const IDLE_TIMEOUT_MS = 4000;
const FALLBACK_DELAY_MS = 2000;

export function DemoWarmUp({ url }: { url: string }) {
  useEffect(() => {
    const wakeUpServer = () => {
      fetch(url, { mode: "no-cors", cache: "no-store" }).catch(() => undefined);
    };

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(wakeUpServer, {
        timeout: IDLE_TIMEOUT_MS,
      });
      return () => window.cancelIdleCallback(handle);
    }

    const timeout = setTimeout(wakeUpServer, FALLBACK_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [url]);

  return null;
}
