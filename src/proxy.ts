import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: o antigo `middleware.ts` passou a se chamar `proxy.ts`.
// Detecta o idioma (cookie → Accept-Language) e redireciona "/" para /pt ou /en.
export default createMiddleware(routing);

export const config = {
  // Ignora API, arquivos internos do Next/Vercel e qualquer arquivo com extensão.
  matcher: "/((?!api|_next|_vercel|.*\..*).*)",
};
