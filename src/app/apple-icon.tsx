import { ImageResponse } from "next/og";
import { ogColors } from "@/lib/og";

// Ícone para a tela inicial do iOS (a mesma rede do favicon, em PNG).

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const edges: [number, number, number, number][] = [
  [90, 90, 45, 50],
  [90, 90, 135, 56],
  [90, 90, 130, 130],
  [90, 90, 50, 130],
];

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: ogColors.bg,
      }}
    >
      <svg width="180" height="180" viewBox="0 0 180 180">
        {edges.map(([x1, y1, x2, y2]) => (
          <line
            key={`${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={ogColors.edge}
            strokeWidth={6}
          />
        ))}
        <circle cx={45} cy={50} r={11} fill={ogColors.muted} />
        <circle cx={135} cy={56} r={11} fill={ogColors.muted} />
        <circle cx={130} cy={130} r={11} fill={ogColors.signal} />
        <circle cx={50} cy={130} r={11} fill={ogColors.muted} />
        <circle cx={90} cy={90} r={19} fill={ogColors.signal} />
      </svg>
    </div>,
    size,
  );
}
