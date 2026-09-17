import type { Metadata } from "next";
import { Manrope, Newsreader, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { RevealProvider } from "@/components/RevealProvider";
import {
  localeHtmlLang,
  localeOg,
  locales,
  routing,
  type Locale,
} from "@/i18n/routing";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { absoluteAssetUrl, assetPath } from "@/lib/assets";
import { absoluteUrl, getLocaleAlternates, siteConfig } from "@/lib/site";
import "../globals.css";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: absoluteUrl("/", locale) }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    category: "business",
    classification: t("classification"),
    alternates: {
      canonical: absoluteUrl("/", locale),
      languages: getLocaleAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: localeOg[locale],
      url: absoluteUrl("/", locale),
      siteName: siteConfig.name,
      title: t("ogTitle"),
      description: t("shortDescription"),
      images: [
        {
          url: absoluteAssetUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("shortDescription"),
      images: [absoluteAssetUrl(siteConfig.ogImage)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: assetPath(siteConfig.logo), type: "image/png" }],
      apple: [{ url: assetPath(siteConfig.logo) }],
      shortcut: [assetPath(siteConfig.logo)],
    },
    other: {
      "geo.region": "MA",
      "geo.placename": "Morocco",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!routing.locales.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = locale === "ar";
  const [org, web] = await Promise.all([
    organizationJsonLd(locale),
    websiteJsonLd(locale),
  ]);

  return (
    <html
      lang={localeHtmlLang[locale]}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
    >
      <body
        className={`min-h-screen bg-paper text-ink antialiased ${
          isRtl ? "font-arabic" : "font-sans"
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={org} />
          <JsonLd data={web} />
          <RevealProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </RevealProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
