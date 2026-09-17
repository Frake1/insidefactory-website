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

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
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

      <section className="section-shell pt-24 sm:pt-28">
        <div className="section-float mx-auto max-w-3xl section-float-pad">
          <p className="eyebrow mb-3 sm:mb-4">{t("eyebrow")}</p>
          <h1 className="page-hero-title">{t("title")}</h1>
          <p className="mt-4 prose-detail sm:mt-6">{t("lead")}</p>

          <div className="mt-10 space-y-4 sm:mt-14">
            {faqs.map((item) => (
              <article key={item.q} className="panel-interactive p-5 sm:p-6">
                <h2 className="font-display text-lg text-ink sm:text-xl">{item.q}</h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                  {item.a}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 border border-line bg-accent-mist p-8 text-center shadow-float sm:mt-16 sm:p-10">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{t("ctaTitle")}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">{t("ctaText")}</p>
            <Link href="/contact" className="btn-primary mt-6 sm:mt-8">
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
