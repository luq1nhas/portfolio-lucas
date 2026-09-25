import { profile } from "@content/profile";

/** Link do WhatsApp com mensagem pré-preenchida no idioma atual. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mailtoUrl = `mailto:${profile.email}`;

/** Atributos obrigatórios para qualquer link externo (regra do brief). */
export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
