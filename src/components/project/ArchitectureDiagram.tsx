"use client";

import { useId, useState } from "react";
import { DIAGRAM_NODE_HEIGHT } from "@content/diagrams";

export type ResolvedNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  kind: "client" | "service" | "ai" | "data" | "external";
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
  scrollHint: string;
};

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

const EDGE_GAP = 4;
const LABEL_CHAR_WIDTH = 6.8;
const LABEL_PADDING = 16;

function labelWidth(label: string) {
  return label.length * LABEL_CHAR_WIDTH + LABEL_PADDING;
}

function edgeStartOnBorder(from: ResolvedNode, to: ResolvedNode) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const halfWidth = from.w / 2 + EDGE_GAP;
  const halfHeight = DIAGRAM_NODE_HEIGHT / 2 + EDGE_GAP;
  const scale = Math.min(
    dx === 0 ? Infinity : halfWidth / Math.abs(dx),
    dy === 0 ? Infinity : halfHeight / Math.abs(dy),
  );
  return { x: from.x + dx * scale, y: from.y + dy * scale };
}

export function ArchitectureDiagram({
  width,
  height,
  nodes,
  edges,
  caption,
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

  return (
    <figure className="flex flex-col gap-4">
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
            const from = byId.get(edge.from)!;
            const to = byId.get(edge.to)!;
            const start = edgeStartOnBorder(from, to);
            const end = edgeStartOnBorder(to, from);
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
                      x={mid.x - labelWidth(edge.label) / 2}
                      y={mid.y - 10}
                      width={labelWidth(edge.label)}
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
                <rect
                  x={node.x - node.w / 2}
                  y={node.y - DIAGRAM_NODE_HEIGHT / 2}
                  width={node.w}
                  height={DIAGRAM_NODE_HEIGHT}
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
      </figcaption>
    </figure>
  );
}
