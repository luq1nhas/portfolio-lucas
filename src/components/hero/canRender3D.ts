/**
 * A cena 3D só roda onde vale a pena: desktop, WebGL disponível, sem
 * preferência por movimento reduzido, sem economia de dados e em aparelhos
 * com fôlego (≥ 4 núcleos e, quando o navegador informa, ≥ 4 GB de memória).
 * Nos demais casos o hero mantém a rede em SVG.
 */
export function canRender3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  if (!window.matchMedia("(min-width: 1024px)").matches) return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 4) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
