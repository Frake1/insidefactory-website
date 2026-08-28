import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { breadcrumbJsonLd } from "@/lib/seo";
import { assetPath } from "@/lib/assets";
import { absoluteUrl, getLocaleAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: absoluteUrl("/a-propos", locale),
      languages: getLocaleAlternates("/a-propos"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/a-propos", locale),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const sectors = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`sector${n}`));
  const values = [1, 2, 3, 4].map((n) => ({
    title: t(`value${n}Title`),
    text: t(`value${n}Text`),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbCurrent"), path: "/a-propos" },
          ],
          locale
        )}
      />

      <section className="relative min-h-[60svh] overflow-hidden pt-24 sm:min-h-[70svh] sm:pt-28">
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/about.jpg")}
            alt={t("heroAlt")}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        </div>
        <div className="relative mx-auto flex min-h-[60svh] max-w-7xl items-end px-4 pb-12 sm:min-h-[70svh] sm:px-6 sm:pb-16 lg:px-10 lg:pb-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-[0.65rem] uppercase tracking-wide text-steel-dim sm:mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="page-hero-title">{t("title")}</h1>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-steel sm:mt-6 sm:text-base">
              {t("heroText")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-steel/10 bg-ink">
        <div className="section-pad mx-auto max-w-3xl">
          <h2 className="section-heading text-3xl sm:text-4xl">{t("missionTitle")}</h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-steel-muted sm:text-base">
            {t("missionP1")}
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-steel-muted sm:text-base">
            {t("missionP2")}
          </p>
        </div>
      </section>

      <section className="border-t border-steel/10 bg-ink-soft">
        <div className="section-pad mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="section-heading text-3xl sm:text-4xl">{t("distinguishTitle")}</h2>
            <p className="mt-6 text-sm font-light leading-relaxed text-steel-muted">
              {t("distinguishP1")}
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-steel-muted">
              {t("distinguishP2")}
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-steel-muted">
              {t("distinguishP3")}
            </p>
          </div>
          <div className="relative min-h-[14rem] overflow-hidden sm:min-h-[18rem] md:min-h-[22rem]">
            <Image
              src={assetPath("/images/about-2.jpg")}
              alt={t("detailAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-steel/10 bg-ink">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="section-heading mb-8 text-2xl sm:text-3xl md:mb-10">
            {t("sectorsTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="border border-steel/15 bg-ink-soft px-4 py-5 text-center text-sm text-steel"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-steel/10 bg-ink-soft">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="section-heading mb-10 text-3xl sm:text-4xl md:mb-14">
            {t("sectionTitle")}
          </h2>
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="text-sm font-light leading-relaxed text-steel-muted sm:text-base">
              {t("sectionP1")}
            </p>
            <p className="text-sm font-light leading-relaxed text-steel-muted sm:text-base">
              {t("sectionP2")}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div key={item.title} className="border-t border-steel/20 pt-6">
                <h3 className="font-display text-xl text-steel-bright sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center sm:mt-16 md:mt-20">
            <Link
              href="/contact"
              className="inline-flex min-h-[3rem] items-center justify-center border border-steel/40 px-8 py-3.5 text-[0.7rem] uppercase tracking-wide text-steel transition-colors hover:border-steel hover:text-steel-bright"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
