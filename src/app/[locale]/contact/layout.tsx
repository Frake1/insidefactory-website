import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, getLocaleAlternates } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: absoluteUrl("/contact", locale),
      languages: getLocaleAlternates("/contact"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/contact", locale),
    },
  };
}

export default async function ContactLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbCurrent"), path: "/contact" },
          ],
          locale
        )}
      />
      {children}
    </>
  );
}
