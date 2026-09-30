// Topologia da "rede de agentes" (coordenadas num quadro 400×400).
// Compartilhada pelo hero (SVG e cena 3D) e pelas imagens Open Graph.

export type NetworkNode = {
  x: number;
  y: number;
  label?: string;
  /** Rótulo à esquerda do nó (para nós na borda direita). */
  labelLeft?: boolean;
  active?: boolean;
};

export const nodes: NetworkNode[] = [
  { x: 200, y: 200, active: true }, // 0: orquestrador
  { x: 108, y: 118, label: "agent", active: true },
  { x: 292, y: 106, label: "llm" },
  { x: 332, y: 222, label: "rag", active: true },
  { x: 268, y: 312 },
  { x: 136, y: 298, label: "tools", active: true },
  { x: 64, y: 206 },
  { x: 204, y: 52 },
  { x: 362, y: 58 },
  { x: 372, y: 336, label: "vector", labelLeft: true },
  { x: 42, y: 344 },
  { x: 34, y: 86 },
  { x: 204, y: 372 },
  { x: 250, y: 158, label: "embed" },
];

export const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 13],
  [1, 7],
  [7, 2],
  [2, 8],
  [2, 13],
  [3, 8],
  [3, 9],
  [4, 9],
  [4, 12],
  [5, 12],
  [5, 10],
  [6, 10],
  [6, 11],
  [1, 11],
  [1, 6],
];

// Arestas por onde "passa sinal".
export const pulses: [number, number][] = [
  [0, 1],
  [0, 3],
  [0, 5],
  [3, 9],
  [2, 13],
];
