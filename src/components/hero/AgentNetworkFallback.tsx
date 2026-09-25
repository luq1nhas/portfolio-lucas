// Versão estática da "rede de agentes". É o visual do hero até a cena 3D carregar
// e o fallback permanente sem WebGL, em aparelhos fracos ou com movimento reduzido.

type Node = {
  x: number;
  y: number;
  label?: string;
  /** Rótulo à esquerda do nó (para nós na borda direita). */
  labelLeft?: boolean;
  active?: boolean;
};

const nodes: Node[] = [
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

const edges: [number, number][] = [
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
const pulses: [number, number][] = [
  [0, 1],
  [0, 3],
  [0, 5],
  [3, 9],
  [2, 13],
];

export function AgentNetworkFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={className}>
      <g stroke="var(--edge)" strokeWidth="1">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g stroke="var(--signal)" strokeWidth="1.5" strokeLinecap="round">
        {pulses.map(([a, b], i) => (
          <line
            key={`p${a}-${b}`}
            className="edge-pulse"
            style={{ animationDelay: `${i * -0.5}s` }}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <g key={i}>
          {n.active && (
            <circle
              cx={n.x}
              cy={n.y}
              r={i === 0 ? 18 : 11}
              fill="var(--signal-soft)"
            />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r={i === 0 ? 7 : n.active ? 4.5 : 3.5}
            fill={n.active ? "var(--signal)" : "var(--surface-2)"}
            stroke={n.active ? "none" : "var(--muted)"}
            strokeWidth="1"
          />
          {n.label && (
            <text
              x={n.labelLeft ? n.x - 9 : n.x + 9}
              textAnchor={n.labelLeft ? "end" : "start"}
              y={n.y - 9}
              fill="var(--muted)"
              fontSize="10"
              fontFamily="var(--font-geist-mono), monospace"
            >
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
