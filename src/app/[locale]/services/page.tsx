import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { assetPath } from "@/lib/assets";
import { absoluteUrl, getLocaleAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: absoluteUrl("/services", locale),
      languages: getLocaleAlternates("/services"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/services", locale),
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("services");

  const partitionTypes = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    title: t(`partitionType${n}`),
    text: t(`partitionType${n}Text`),
  }));

  const acousticPoints = [1, 2, 3, 4].map((n) => t(`acousticP${n}`));
  const ceilingMats = [1, 2, 3, 4].map((n) => t(`ceilingMat${n}`));
  const floorMats = [1, 2, 3, 4, 5].map((n) => t(`floorMat${n}`));

  return (
    <>
      <JsonLd data={await serviceJsonLd(locale)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t("breadcrumbHome"), path: "/" },
            { name: t("breadcrumbCurrent"), path: "/services" },
          ],
          locale
        )}
      />

      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/cloison-bureau.jpg")}
            alt=""
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <p className="mb-3 text-[0.65rem] uppercase tracking-wide text-steel-dim sm:mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="page-hero-title max-w-3xl">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-steel-muted sm:mt-6 sm:text-base">
            {t("lead")}
          </p>
        </div>
      </section>

      {/* Sectors — Hoyez style */}
      <section className="border-t border-steel/10 bg-ink-soft">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="section-heading mb-8 text-2xl sm:text-3xl md:mb-10">
            {t("sectorsTitle")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative min-h-[14rem] overflow-hidden border border-steel/10 sm:min-h-[16rem]">
              <Image
                src={assetPath("/images/office-glass.jpg")}
                alt={t("officeTitle")}
                fill
                className="object-cover opacity-40"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-steel-bright">{t("officeTitle")}</h3>
                <p className="mt-2 text-sm font-light text-steel">{t("officeText")}</p>
              </div>
            </div>
            <div className="relative min-h-[14rem] overflow-hidden border border-steel/10 sm:min-h-[16rem]">
              <Image
                src={assetPath("/images/cloison-industrielle.jpg")}
                alt={t("industrialTitle")}
                fill
                className="object-cover opacity-40"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-steel-bright">{t("industrialTitle")}</h3>
                <p className="mt-2 text-sm font-light text-steel">{t("industrialText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloisons — primary */}
      <section
        id="cloisons"
        className="scroll-mt-20 border-t border-steel/10 bg-ink md:scroll-mt-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-0 md:grid-cols-2">
          <div className="relative min-h-[14rem] sm:min-h-[18rem] md:min-h-[28rem] lg:min-h-[34rem]">
            <Image
              src={assetPath("/images/office-partition.jpg")}
              alt={t("partitionsTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="px-4 py-10 sm:px-6 sm:py-14 md:px-12 lg:px-16 lg:py-24">
            <h2 className="font-display text-3xl text-steel-bright sm:text-4xl md:text-5xl">
              {t("partitionsTitle")}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-steel sm:mt-6 sm:text-lg">
              {t("partitionsLead")}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted sm:mt-4">
              {t("partitionsBody")}
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-3 text-sm text-steel-muted"
                >
                  <span className="mt-2 h-px w-6 shrink-0 bg-steel/40" />
                  {t(`partitionsP${n}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Finishes grid */}
      <section className="border-t border-steel/10 bg-ink-soft">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="section-heading mb-8 text-2xl sm:text-3xl md:mb-12">
            {t("partitionTypesTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partitionTypes.map((item) => (
              <div
                key={item.title}
                className="border border-steel/10 bg-ink px-5 py-6"
              >
                <h3 className="font-display text-lg text-steel-bright">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acoustique — primary */}
      <section
        id="acoustique"
        className="scroll-mt-20 border-t border-steel/10 bg-ink md:scroll-mt-24"
      >
        <div className="section-pad mx-auto max-w-7xl">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-3xl text-steel-bright sm:text-4xl md:text-5xl">
                {t("acousticTitle")}
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed text-steel sm:mt-6 sm:text-lg">
                {t("acousticLead")}
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-steel-muted">
                {t("acousticBody")}
              </p>
            </div>
            <ul className="space-y-4 border-t border-steel/15 pt-6 md:border-t-0 md:pt-2">
              {acousticPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 border-b border-steel/10 pb-4 text-sm text-steel"
                >
                  <span className="mt-2 h-px w-8 shrink-0 bg-steel/50" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Plafonds techniques */}
      <section
        id="plafonds"
        className="scroll-mt-20 border-t border-steel/10 bg-ink-soft md:scroll-mt-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-0 md:grid-cols-2 md:[&>*:first-child]:order-2">
          <div className="relative min-h-[14rem] sm:min-h-[18rem] md:min-h-[28rem]">
            <Image
              src={assetPath("/images/plafond.jpg")}
              alt={t("ceilingsTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="px-4 py-10 sm:px-6 sm:py-14 md:px-12 lg:px-16 lg:py-24">
            <h2 className="font-display text-3xl text-steel-bright sm:text-4xl md:text-5xl">
              {t("ceilingsTitle")}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-steel sm:mt-6 sm:text-lg">
              {t("ceilingsLead")}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted sm:mt-4">
              {t("ceilingsBody")}
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-3 text-sm text-steel-muted"
                >
                  <span className="mt-2 h-px w-6 shrink-0 bg-steel/40" />
                  {t(`ceilingsP${n}`)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {ceilingMats.map((mat) => (
                <span
                  key={mat}
                  className="border border-steel/20 px-3 py-1.5 text-[0.7rem] uppercase tracking-wide text-steel-dim"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plancher technique */}
      <section
        id="sols"
        className="scroll-mt-20 border-t border-steel/10 bg-ink md:scroll-mt-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-0 md:grid-cols-2">
          <div className="relative min-h-[14rem] sm:min-h-[18rem] md:min-h-[28rem]">
            <Image
              src={assetPath("/images/sol-detail.jpg")}
              alt={t("floorsTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="px-4 py-10 sm:px-6 sm:py-14 md:px-12 lg:px-16 lg:py-24">
            <h2 className="font-display text-3xl text-steel-bright sm:text-4xl md:text-5xl">
              {t("floorsTitle")}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-steel sm:mt-6 sm:text-lg">
              {t("floorsLead")}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted sm:mt-4">
              {t("floorsBody")}
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-3 text-sm text-steel-muted"
                >
                  <span className="mt-2 h-px w-6 shrink-0 bg-steel/40" />
                  {t(`floorsP${n}`)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {floorMats.map((mat) => (
                <span
                  key={mat}
                  className="border border-steel/20 px-3 py-1.5 text-[0.7rem] uppercase tracking-wide text-steel-dim"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary — de-emphasized */}
      <section
        id="complementaires"
        className="scroll-mt-20 border-t border-steel/10 bg-ink-soft md:scroll-mt-24"
      >
        <div className="section-pad mx-auto max-w-7xl">
          <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-steel-dim">
            {t("secondaryTitle")}
          </p>
          <h2 className="font-display text-2xl text-steel-bright sm:text-3xl">
            {t("secondaryTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-light text-steel-muted">
            {t("secondaryLead")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border border-steel/10 bg-ink px-5 py-6">
              <h3 className="font-display text-lg text-steel">{t("secondary1Title")}</h3>
              <p className="mt-2 text-sm font-light text-steel-muted">{t("secondary1Text")}</p>
            </div>
            <div className="border border-steel/10 bg-ink px-5 py-6">
              <h3 className="font-display text-lg text-steel">{t("secondary2Title")}</h3>
              <p className="mt-2 text-sm font-light text-steel-muted">{t("secondary2Text")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-tight border-t border-steel/10 bg-ink text-center">
        <h2 className="section-heading text-3xl sm:text-4xl">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm font-light text-steel-muted sm:mt-4">
          {t("ctaText")}
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex min-h-[3rem] items-center justify-center bg-steel px-8 py-3.5 text-[0.7rem] uppercase tracking-wide text-ink transition-colors hover:bg-steel-bright sm:mt-8"
        >
          {t("ctaButton")}
        </Link>
      </section>
    </>
  );
}
