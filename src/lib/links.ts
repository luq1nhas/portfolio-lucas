import { profile } from "@content/profile";

export function whatsappUrl(message: string) {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mailtoUrl = `mailto:${profile.email}`;

export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
