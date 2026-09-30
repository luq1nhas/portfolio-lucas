import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucas Vieira · Full Stack | IA Aplicada",
    short_name: "Lucas Vieira",
    start_url: "/",
    display: "browser",
    background_color: "#0a0c10",
    theme_color: "#0a0c10",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
