import { localeHreflang, routing, type Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "Inside Factory",
  legalName: "Inside Factory",
  alternateNames: [
    "InsideFactory",
    "Inside Factory Maroc",
    "Inside Factory Morocco",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://insidefactory.ma",
  email: "contact@insidefactory.ma",
  phone: "+212661550580",
  phoneDisplay: "+212 6 61 55 05 80",
  ogImage: "/images/hero-office.jpg",
  logo: "/logo/logo-transparent.png",
  pagePaths: ["/", "/services", "/a-propos", "/contact", "/faq"] as const,
} as const;

export function absoluteUrl(path = "/", locale: Locale = routing.defaultLocale) {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  if (normalized === "/") {
    return prefix ? `${base}${prefix}` : base;
  }

  return `${base}${prefix}${normalized}`;
}

export function getLocaleAlternates(path = "/") {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(path, routing.defaultLocale),
  };

  for (const locale of routing.locales) {
    languages[localeHreflang[locale]] = absoluteUrl(path, locale);
  }

  return languages;
}
