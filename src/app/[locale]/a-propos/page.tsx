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
  const method = [1, 2, 3].map((n) => ({
    title: t(`method${n}Title`),
    text: t(`method${n}Text`),
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
          <div className="media-scrim-hero" />
        </div>
        <div className="relative z-[1] mx-auto flex min-h-[60svh] max-w-7xl items-end px-4 pb-12 sm:min-h-[70svh] sm:px-6 sm:pb-16 lg:px-10 lg:pb-24">
          <div className="max-w-2xl">
            <p className="on-media-soft mb-3 text-[0.65rem] font-medium uppercase tracking-wide sm:mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="page-hero-title-on-dark">{t("title")}</h1>
            <p className="on-media-muted mt-4 max-w-xl text-sm font-light leading-relaxed sm:mt-6 sm:text-base">
              {t("heroText")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-float mx-auto max-w-3xl section-float-pad">
          <h2 className="section-heading text-3xl sm:text-4xl">{t("missionTitle")}</h2>
          <p className="mt-6 prose-detail">{t("missionP1")}</p>
          <p className="mt-4 prose-detail">{t("missionP2")}</p>
        </div>
      </section>

      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2">
          <div className="section-float-pad flex flex-col justify-center">
            <h2 className="section-heading text-3xl sm:text-4xl">{t("distinguishTitle")}</h2>
            <p className="mt-6 prose-detail">{t("distinguishP1")}</p>
            <p className="mt-4 prose-detail">{t("distinguishP2")}</p>
            <p className="mt-4 prose-detail">{t("distinguishP3")}</p>
          </div>
          <div className="relative min-h-[14rem] sm:min-h-[18rem] md:min-h-full md:min-h-[22rem]">
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

      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <h2 className="section-heading mb-4 text-2xl sm:text-3xl">{t("methodTitle")}</h2>
          <p className="mb-8 max-w-2xl prose-detail md:mb-10">{t("methodLead")}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {method.map((item, i) => (
              <div key={item.title} className="panel-interactive p-5 sm:p-6">
                <span className="text-[0.65rem] font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-2 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <h2 className="section-heading mb-4 text-2xl sm:text-3xl">{t("sectorsTitle")}</h2>
          <p className="mb-8 max-w-2xl prose-detail md:mb-10">{t("sectorsLead")}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="border border-line bg-paper px-4 py-5 text-center text-sm font-medium text-ink-soft shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0 sm:pt-0 lg:pt-0 pb-12 sm:pb-14 lg:pb-16">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <h2 className="section-heading mb-6 text-3xl sm:text-4xl md:mb-8">
            {t("sectionTitle")}
          </h2>
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="prose-detail">{t("sectionP1")}</p>
            <p className="prose-detail">{t("sectionP2")}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div key={item.title} className="panel-interactive p-5 sm:p-6">
                <h3 className="font-display text-xl text-ink sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center sm:mt-16 md:mt-20">
            <Link href="/contact" className="btn-primary">
              {t("cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
