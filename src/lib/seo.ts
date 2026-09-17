import { absoluteAssetUrl } from "@/lib/assets";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

function assetUrl(path: string) {
  return absoluteAssetUrl(path);
}

export async function organizationJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "seo" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const knowsAbout = t.raw("knowsAbout") as string[];
  const languages = t.raw("availableLanguage") as string[];

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${absoluteUrl("/", locale)}/#organization`,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    legalName: siteConfig.legalName,
    url: absoluteUrl("/", locale),
    logo: assetUrl(siteConfig.logo),
    image: assetUrl(siteConfig.ogImage),
    description: meta("description"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: { "@type": "Country", name: "Morocco" },
    address: { "@type": "PostalAddress", addressCountry: "MA" },
    sameAs: [siteConfig.url],
    knowsAbout,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "sales",
        email: siteConfig.email,
        availableLanguage: languages,
        areaServed: "MA",
      },
    ],
  };
}

export async function websiteJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/", locale)}/#website`,
    url: absoluteUrl("/", locale),
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    description: t("shortDescription"),
    inLanguage: locale === "fr" ? "fr-MA" : locale === "ar" ? "ar" : "en",
    publisher: { "@id": `${absoluteUrl("/", locale)}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/contact", locale)}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export async function serviceJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "seo" });

  const services = [
    {
      name: t("servicePartitionsName"),
      description: t("servicePartitionsDesc"),
      url: absoluteUrl("/services#cloisons", locale),
    },
    {
      name: t("serviceOfficesName"),
      description: t("serviceOfficesDesc"),
      url: absoluteUrl("/services#acoustique", locale),
    },
    {
      name: t("serviceCeilingsName"),
      description: t("serviceCeilingsDesc"),
      url: absoluteUrl("/services#plafonds", locale),
    },
    {
      name: t("serviceFloorsName"),
      description: t("serviceFloorsDesc"),
      url: absoluteUrl("/services#sols", locale),
    },
    {
      name: t("serviceEstablishmentsName"),
      description: t("serviceEstablishmentsDesc"),
      url: absoluteUrl("/services#complementaires", locale),
    },
    {
      name: t("serviceTurnkeyName"),
      description: t("serviceTurnkeyDesc"),
      url: absoluteUrl("/services#complementaires", locale),
    },
  ];

  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { "@id": `${absoluteUrl("/", locale)}/#organization` },
    areaServed: { "@type": "Country", name: "Morocco" },
    serviceType: t("serviceType"),
  }));
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
    })),
  };
}

export async function faqJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      "@type": "Question",
      name: t(`faq${n}Q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq${n}A`),
      },
    })),
  };
}
