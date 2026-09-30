"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { edges, nodes, pulses } from "./network";

// Cena 3D da "rede de agentes": a mesma topologia do SVG, em profundidade.
// Gira levemente seguindo o cursor, e o nó mais próximo do cursor acende.

type Palette = { signal: string; muted: string; edge: string };

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const get = (name: string) => css.getPropertyValue(name).trim();
  return {
    signal: get("--signal"),
    muted: get("--muted"),
    edge: get("--edge"),
  };
}

/** Acompanha a troca de tema (data-theme em <html>) para recolorir a cena. */
function usePalette() {
  const [palette, setPalette] = useState<Palette>(readPalette);
  useEffect(() => {
    const observer = new MutationObserver(() => setPalette(readPalette()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return palette;
}

// Profundidade determinística por nó, para a rede não ficar chapada.
const depth = (i: number) => (((i * 37) % 11) - 5) * 0.16;
const positions = nodes.map(
  (n, i) => new THREE.Vector3((n.x - 200) / 95, -(n.y - 200) / 95, depth(i)),
);

function Network({
  palette,
  pointer,
}: {
  palette: Palette;
  pointer: React.RefObject<{ x: number; y: number; active: boolean }>;
}) {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const projected = useMemo(() => new THREE.Vector3(), []);

  const edgeGeometry = useMemo(() => {
    const array = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[a].toArray(array, i * 6);
      positions[b].toArray(array, i * 6 + 3);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(array, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;

    // Rotação: oscilação lenta + inclinação na direção do cursor.
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      Math.sin(t * 0.25) * 0.25 + p.x * 0.45,
      3,
      delta,
    );
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -p.y * 0.3, 3, delta);

    // O nó mais próximo do cursor (em coordenadas de tela) cresce.
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.getWorldPosition(projected).project(state.camera);
      const near =
        p.active && Math.hypot(projected.x - p.x, projected.y - p.y) < 0.12;
      const base = i === 0 ? 1.6 : nodes[i].active ? 1.15 : 0.85;
      const target = near ? base * 1.9 : base;
      mesh.scale.setScalar(
        THREE.MathUtils.damp(mesh.scale.x, target, 8, delta),
      );
    });

    // Sinais percorrendo as arestas ativas.
    pulses.forEach(([a, b], i) => {
      const mesh = pulseRefs.current[i];
      if (!mesh) return;
      const progress = (t * 0.35 + i * 0.23) % 1;
      mesh.position.lerpVectors(positions[a], positions[b], progress);
    });
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color={palette.edge} transparent opacity={0.9} />
      </lineSegments>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(m) => {
            nodeRefs.current[i] = m;
          }}
        >
          <sphereGeometry args={[0.06, 20, 20]} />
          <meshBasicMaterial
            color={nodes[i].active ? palette.signal : palette.muted}
          />
        </mesh>
      ))}
      {pulses.map((_, i) => (
        <mesh
          key={`pulse-${i}`}
          ref={(m) => {
            pulseRefs.current[i] = m;
          }}
        >
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={palette.signal} />
        </mesh>
      ))}
    </group>
  );
}

export default function AgentNetwork3D({ onReady }: { onReady: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const [visible, setVisible] = useState(true);
  const palette = usePalette();

  // Cursor em toda a janela, normalizado em relação ao canvas (-1..1).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = container.current?.getBoundingClientRect();
      if (!rect) return;
      pointer.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
        active: true,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Fora da tela, a cena para de renderizar.
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => requestAnimationFrame(onReady)}
      >
        <Network palette={palette} pointer={pointer} />
      </Canvas>
    </div>
  );
}
