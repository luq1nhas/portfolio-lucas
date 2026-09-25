import { Download, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ComponentType } from "react";
import { profile } from "@content/profile";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";
import { external, mailtoUrl, whatsappUrl } from "@/lib/links";

type ContactLink = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  isExternal?: boolean;
  download?: boolean;
  hrefLang?: string;
};

/** Conjunto único de contatos: usado no rodapé e na seção Contato. */
export async function ContactLinks({ className }: { className?: string }) {
  const t = await getTranslations("Contact");

  const links: ContactLink[] = [
    { label: profile.email, href: mailtoUrl, Icon: Mail },
    {
      label: t("whatsapp"),
      href: whatsappUrl(t("whatsappMessage")),
      Icon: WhatsappIcon,
      isExternal: true,
    },
    {
      label: t("linkedin"),
      href: profile.linkedin,
      Icon: LinkedinIcon,
      isExternal: true,
    },
    {
      label: t("github"),
      href: profile.github,
      Icon: GithubIcon,
      isExternal: true,
    },
    {
      label: t("resumePt"),
      href: profile.resume.pt,
      Icon: Download,
      download: true,
      hrefLang: "pt-BR",
    },
    {
      label: t("resumeEn"),
      href: profile.resume.en,
      Icon: Download,
      download: true,
      hrefLang: "en",
    },
  ];

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map(({ label, href, Icon, isExternal, download, hrefLang }) => (
        <li key={href}>
          <a
            href={href}
            download={download || undefined}
            hrefLang={hrefLang}
            {...(isExternal ? external : {})}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm text-muted transition-colors hover:border-signal hover:text-fg"
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
