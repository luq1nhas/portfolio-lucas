import type { Testimonial } from "./types";

// Trechos da carta de recomendação. Por decisão do autor do portfólio,
// não publicar o telefone do autor nem o motivo do desligamento.
export const testimonial: Testimonial = {
  author: "Ygor Pereira de Sá",
  role: {
    pt: "Tech Lead na MJV Technology & Innovation",
    en: "Tech Lead at MJV Technology & Innovation",
  },
  linkedin: "https://www.linkedin.com/in/ygorpsa",
  originalLocale: "pt",
  quotes: {
    pt: [
      "Recomendo Lucas sem ressalvas para posições de desenvolvimento full-stack.",
      "Destacou-se por sua proatividade, comprometimento e disposição constante para aprender e ajudar o time.",
    ],
    en: [
      "I recommend Lucas without reservation for full-stack development positions.",
      "Stood out for proactivity, commitment and a constant willingness to learn and help the team.",
    ],
  },
};
