import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export const localeHtmlLang: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  ar: "ar",
};

export const localeOg: Record<Locale, string> = {
  fr: "fr_MA",
  en: "en_US",
  ar: "ar_MA",
};

export const localeHreflang: Record<Locale, string> = {
  fr: "fr-MA",
  en: "en",
  ar: "ar",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  localePrefix: "as-needed",
});
