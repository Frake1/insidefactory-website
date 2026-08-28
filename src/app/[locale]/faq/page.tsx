import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, getLocaleAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: absoluteUrl("/faq", locale),
      languages: getLocaleAlternates("/faq"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/faq", locale),
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("faq");

  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: t(`faq${n}Q`),
    a: t(`faq${n}A`),
  }));

  return (
    <>
      <JsonLd data={await faqJsonLd(locale)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbCurrent"), path: "/faq" },
          ],
          locale
        )}
      />

      <section className="border-b border-steel/10 bg-ink pt-24 sm:pt-28">
        <div className="section-pad mx-auto max-w-3xl">
          <p className="mb-3 text-[0.65rem] uppercase tracking-wide text-steel-dim sm:mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="page-hero-title">{t("title")}</h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-steel-muted sm:mt-6 sm:text-base">
            {t("lead")}
          </p>

          <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
            {faqs.map((item) => (
              <article key={item.q} className="border-t border-steel/15 pt-5 sm:pt-6">
                <h2 className="font-display text-lg text-steel-bright sm:text-xl">
                  {item.q}
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted">
                  {item.a}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 border-t border-steel/10 pt-10 text-center sm:mt-16">
            <h2 className="font-display text-2xl text-steel-bright sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-steel-muted">{t("ctaText")}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-[3rem] items-center justify-center bg-steel px-8 py-3.5 text-[0.7rem] uppercase tracking-wide text-ink transition-colors hover:bg-steel-bright sm:mt-8"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
