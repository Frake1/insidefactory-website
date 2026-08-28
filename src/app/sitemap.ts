import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of siteConfig.pagePaths) {
    for (const locale of routing.locales) {
      const languages: Record<string, string> = {
        "x-default": absoluteUrl(path, routing.defaultLocale),
      };
      for (const loc of routing.locales) {
        languages[loc] = absoluteUrl(path, loc as Locale);
      }

      entries.push({
        url: absoluteUrl(path, locale as Locale),
        lastModified,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : path === "/services" || path === "/contact" ? 0.9 : path === "/faq" ? 0.85 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
