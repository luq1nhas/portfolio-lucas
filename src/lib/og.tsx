import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { createTranslator, hasLocale, type Messages } from "next-intl";
import type { ReactNode } from "react";
import { edges, nodes, pulses } from "./network";
import { routing, type Locale } from "@/i18n/routing";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export const ogColors = {
  bg: "#0a0c10",
  surface: "#11151c",
  border: "#222834",
  fg: "#e8eaef",
  muted: "#96a0b0",
  signal: "#4fe3c1",
  result: "#f4b350",
  tag: "#a99bff",
  edge: "#2c3442",
};

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");

async function loadFonts() {
  const [regular, semibold, mono] = await Promise.all([
    readFile(join(fontDir, "geist-sans/Geist-Regular.ttf")),
    readFile(join(fontDir, "geist-sans/Geist-SemiBold.ttf")),
    readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
  ]);
  return [
    {
      name: "Geist",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: semibold,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: mono,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

function Network({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={ogColors.edge}
          strokeWidth={1.5}
        />
      ))}
      {pulses.map(([a, b]) => (
        <line
          key={`p${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={ogColors.signal}
          strokeWidth={2}
          strokeDasharray="4 10"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.hub ? 8 : n.active ? 5.5 : 4}
          fill={n.active ? ogColors.signal : ogColors.surface}
          stroke={n.active ? ogColors.signal : ogColors.muted}
          strokeWidth={1.2}
        />
      ))}
    </svg>
  );
}

type OgProps = {
  kicker: ReactNode;
  title: string;
  subtitle: ReactNode;
  body?: ReactNode;
  pills?: string[];
  footer: string;
};

export async function renderOgImage({
  kicker,
  title,
  subtitle,
  body,
  pills,
  footer,
}: OgProps) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: ogColors.bg,
        color: ogColors.fg,
        fontFamily: "Geist",
        padding: 64,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 110,
          display: "flex",
          opacity: 0.9,
        }}
      >
        <Network size={410} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 760,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            alignSelf: "flex-start",
            border: `1px solid ${ogColors.border}`,
            background: ogColors.surface,
            borderRadius: 999,
            padding: "8px 18px",
            fontSize: 22,
            color: ogColors.muted,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: ogColors.signal,
            }}
          />
          {kicker}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 16,
            fontSize: 27,
            color: ogColors.muted,
          }}
        >
          {subtitle}
        </div>
        {body && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 32,
              fontSize: 30,
              lineHeight: 1.3,
            }}
          >
            {body}
          </div>
        )}
        {pills && pills.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 32,
            }}
          >
            {pills.map((pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  border: `1.5px solid ${ogColors.tag}`,
                  color: ogColors.tag,
                  borderRadius: 999,
                  padding: "6px 16px",
                  fontSize: 22,
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: ogColors.muted,
          }}
        >
          {footer}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}

export function RichWords({
  raw,
  colors,
  gap,
}: {
  raw: string;
  colors: Record<string, string>;
  gap: number;
}) {
  const words: { text: string; color?: string }[][] = [];
  let glued = false;
  for (const part of raw.split(/(<\w+>.*?<\/\w+>)/)) {
    const tagged = part.match(/^<(\w+)>(.*?)<\/\1>$/);
    const text = tagged ? tagged[2] : part;
    const color = tagged ? colors[tagged[1]] : undefined;
    for (const token of text.split(/(\s+)/)) {
      if (token === "") continue;
      if (/^\s+$/.test(token)) {
        glued = false;
        continue;
      }
      if (glued && words.length > 0)
        words[words.length - 1].push({ text: token, color });
      else words.push([{ text: token, color }]);
      glued = true;
    }
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: gap }}>
      {words.map((word, i) => (
        <div key={i} style={{ display: "flex" }}>
          {word.map((piece, j) => (
            <span
              key={j}
              style={piece.color ? { color: piece.color } : undefined}
            >
              {piece.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export async function ogTranslator<N extends keyof Messages>(
  locale: Locale,
  namespace: N,
) {
  const messages = (await import(`../../messages/${locale}.json`))
    .default as Messages;
  return createTranslator({ locale, messages, namespace });
}

export function ogLocale(value: string | undefined): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
