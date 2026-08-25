import type { Lang } from "@/src/config/constants";
import en from "@/src/locales/en.json";
import es from "@/src/locales/es.json";
import fr from "@/src/locales/fr.json";

export type LocaleMessages = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  ecosystem: {
    badge: string;
    desc: string;
  };
  standards: {
    quebec: string;
  };
  legal: {
    entityNotice: string;
  };
  header: {
    legalBadge: string;
    verifiaLab: string;
    verifiaLedger: string;
    llcNotice: string;
  };
  footer: {
    mission: string;
    ecosystemHeading: string;
    safeAi: string;
    waqfLedger: string;
    bouclier: string;
    ateliers: string;
    regulatoryHeading: string;
    regEu: string;
    regIso: string;
    regQuebec: string;
    regFrance: string;
    legalHeading: string;
    morNotice: string;
    copyright: string;
  };
};

export const localeMessages: Record<Lang, LocaleMessages> = {
  FR: fr,
  EN: en,
  ES: es,
};

export function getLocaleMessages(lang: Lang): LocaleMessages {
  return localeMessages[lang];
}
