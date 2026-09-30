// Versão estática da "rede de agentes". É o visual do hero até a cena 3D carregar
// e o fallback permanente sem WebGL, em aparelhos fracos ou com movimento reduzido.

import { edges, nodes, pulses } from "./network";

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
