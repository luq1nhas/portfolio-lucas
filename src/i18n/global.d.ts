import type { routing } from "./routing";
import type messages from "../../messages/pt.json";

// Tipa as chaves de tradução: uma chave inexistente vira erro de compilação.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
