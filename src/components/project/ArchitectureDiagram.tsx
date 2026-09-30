"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type ResolvedNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  kind: "client" | "service" | "ai" | "data" | "external";
  mine?: boolean;
};

export type ResolvedEdge = {
  from: string;
  to: string;
  label?: string;
  flow?: boolean;
  optional?: boolean;
};

type Props = {
  width: number;
  height: number;
  nodes: ResolvedNode[];
  edges: ResolvedEdge[];
  caption: string;
  mineLabel: string;
  scrollHint: string;
};

const NODE_H = 54;

const kindStyle: Record<
  ResolvedNode["kind"],
  { stroke: string; fill: string; dash?: string }
> = {
  client: { stroke: "var(--fg)", fill: "var(--surface)" },
  service: { stroke: "var(--muted)", fill: "var(--surface)" },
  ai: { stroke: "var(--signal)", fill: "var(--signal-soft)" },
  data: { stroke: "var(--tag)", fill: "var(--surface)" },
  external: { stroke: "var(--muted)", fill: "var(--bg)", dash: "4 4" },
};

/** Ponto onde a reta entre dois centros cruza a borda da caixa de origem. */
function clip(from: ResolvedNode, to: ResolvedNode) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const hw = from.w / 2 + 4;
  const hh = NODE_H / 2 + 4;
  const t = Math.min(
    dx === 0 ? Infinity : hw / Math.abs(dx),
    dy === 0 ? Infinity : hh / Math.abs(dy),
  );
  return { x: from.x + dx * t, y: from.y + dy * t };
}

/**
 * Diagrama de arquitetura em SVG. O fluxo principal é destacado em verde.
 * Passar o mouse sobre um componente
 * destaca suas conexões. A legenda descreve o fluxo em texto.
 */
export function ArchitectureDiagram({
  width,
  height,
  nodes,
  edges,
  caption,
  mineLabel,
  scrollHint,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const connected = (edge: ResolvedEdge) =>
    hovered === null || edge.from === hovered || edge.to === hovered;
  const nodeActive = (id: string) =>
    hovered === null ||
    id === hovered ||
    edges.some(
      (e) =>
        (e.from === hovered && e.to === id) ||
        (e.to === hovered && e.from === id),
    );
  const hasMine = nodes.some((n) => n.mine);

  return (
    <figure className="flex flex-col gap-4">
      {/* No celular o diagrama rola na horizontal em vez de encolher o texto. */}
      <p aria-hidden className="font-mono text-xs text-muted sm:hidden">
        {scrollHint}
      </p>
      <div
        tabIndex={0}
        role="group"
        aria-labelledby={`${uid}-caption`}
        className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${uid}-caption`}
          className="w-full min-w-[620px]"
        >
          <defs>
            <marker
              id={`${uid}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
            </marker>
          </defs>

          {edges.map((edge) => {
            const a = byId.get(edge.from)!;
            const b = byId.get(edge.to)!;
            const start = clip(a, b);
            const end = clip(b, a);
            const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
            const key = `${edge.from}-${edge.to}`;
            return (
              <g key={key} className="" opacity={connected(edge) ? 1 : 0.2}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="var(--edge)"
                  strokeWidth={1.5}
                  strokeDasharray={edge.optional ? "5 5" : undefined}
                  markerEnd={`url(#${uid}-arrow)`}
                />
                {edge.flow && (
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="var(--signal)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                )}
                {edge.label && (
                  <g>
                    <rect
                      x={mid.x - (edge.label.length * 6.2 + 14) / 2}
                      y={mid.y - 10}
                      width={edge.label.length * 6.2 + 14}
                      height={20}
                      rx={10}
                      fill="var(--bg)"
                      stroke="var(--border)"
                    />
                    <text
                      x={mid.x}
                      y={mid.y + 4}
                      textAnchor="middle"
                      fontSize={11}
                      fill="var(--muted)"
                      fontFamily="var(--font-geist-mono), monospace"
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {nodes.map((node) => {
            const style = kindStyle[node.kind];
            return (
              <g
                key={node.id}
                onPointerEnter={() => setHovered(node.id)}
                onPointerLeave={() => setHovered(null)}
                className="cursor-default"
                opacity={nodeActive(node.id) ? 1 : 0.35}
              >
                {node.mine && (
                  <rect
                    x={node.x - node.w / 2 - 5}
                    y={node.y - NODE_H / 2 - 5}
                    width={node.w + 10}
                    height={NODE_H + 10}
                    rx={14}
                    fill="none"
                    stroke="var(--result)"
                    strokeWidth={1.5}
                  />
                )}
                <rect
                  x={node.x - node.w / 2}
                  y={node.y - NODE_H / 2}
                  width={node.w}
                  height={NODE_H}
                  rx={10}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={1.2}
                  strokeDasharray={style.dash}
                />
                <text
                  x={node.x}
                  y={node.sub ? node.y - 3 : node.y + 5}
                  textAnchor="middle"
                  fontSize={13.5}
                  fontWeight={600}
                  fill="var(--fg)"
                >
                  {node.label}
                </text>
                {node.sub && (
                  <text
                    x={node.x}
                    y={node.y + 15}
                    textAnchor="middle"
                    fontSize={10.5}
                    fill="var(--muted)"
                    fontFamily="var(--font-geist-mono), monospace"
                  >
                    {node.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption
        id={`${uid}-caption`}
        className="text-sm leading-relaxed text-muted"
      >
        {caption}
        {hasMine && (
          <span className="mt-2 flex items-center gap-2 text-xs">
            <span
              aria-hidden
              className={cn(
                "inline-block h-3 w-5 rounded border-[1.5px] border-result",
              )}
            />
            {mineLabel}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
