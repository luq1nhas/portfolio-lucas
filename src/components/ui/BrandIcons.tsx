import { siGithub, siWhatsapp } from "simple-icons";

type IconProps = { className?: string };

function SimpleIcon({ path, className }: { path: string } & IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={path} />
    </svg>
  );
}

export const GithubIcon = (p: IconProps) => (
  <SimpleIcon path={siGithub.path} {...p} />
);
export const WhatsappIcon = (p: IconProps) => (
  <SimpleIcon path={siWhatsapp.path} {...p} />
);

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5 2h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm2.5 3.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM6 10v8h3v-8H6Zm5 0v8h3v-4.2c0-1.1.5-1.8 1.4-1.8.9 0 1.3.6 1.3 1.8V18h3v-4.9c0-2.4-1.2-3.3-3-3.3-1.2 0-2.1.5-2.7 1.3V10h-3Z"
      />
    </svg>
  );
}
