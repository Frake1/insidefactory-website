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
  const overview = [1, 2, 3, 4].map((n) => ({
    title: t(`overview${n}Title`),
    text: t(`overview${n}Text`),
  }));

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
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="media-scrim-page" />
        </div>
        <div className="relative z-[1] mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <p className="on-media-soft mb-3 text-[0.65rem] font-medium uppercase tracking-wide sm:mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="page-hero-title-on-dark max-w-3xl">{t("title")}</h1>
          <p className="on-media-muted mt-4 max-w-2xl text-sm font-light leading-relaxed sm:mt-6 sm:text-base">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="eyebrow mb-3">{t("overviewEyebrow")}</p>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">
              {t("overviewTitle")}
            </h2>
            <p className="mt-4 prose-detail">{t("overviewLead")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overview.map((item, i) => (
              <div key={item.title} className="panel-interactive p-5">
                <span className="text-[0.65rem] font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink-muted">
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
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card-lift relative min-h-[15rem] overflow-hidden sm:min-h-[18rem]">
              <Image
                src={assetPath("/images/office-glass.jpg")}
                alt={t("officeTitle")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="media-scrim-card" />
              <div className="absolute inset-x-0 bottom-0 z-[1] p-6">
                <h3 className="on-media font-display text-2xl">{t("officeTitle")}</h3>
                <p className="on-media-muted mt-2 text-sm font-light">{t("officeText")}</p>
              </div>
            </div>
            <div className="card-lift relative min-h-[15rem] overflow-hidden sm:min-h-[18rem]">
              <Image
                src={assetPath("/images/cloison-industrielle.jpg")}
                alt={t("industrialTitle")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="media-scrim-card" />
              <div className="absolute inset-x-0 bottom-0 z-[1] p-6">
                <h3 className="on-media font-display text-2xl">{t("industrialTitle")}</h3>
                <p className="on-media-muted mt-2 text-sm font-light">{t("industrialText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="cloisons"
        className="section-shell scroll-mt-20 pt-0 sm:pt-0 md:scroll-mt-24 lg:pt-0"
      >
        <div className="section-float mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2">
          <div className="relative min-h-[14rem] sm:min-h-[18rem] md:min-h-[28rem] lg:min-h-[34rem]">
            <Image
              src={assetPath("/images/office-partition.jpg")}
              alt={t("partitionsTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="section-float-pad flex flex-col justify-center">
            <p className="eyebrow mb-3">{t("partitionsEyebrow")}</p>
            <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
              {t("partitionsTitle")}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
              {t("partitionsLead")}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted sm:mt-4">
              {t("partitionsBody")}
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="list-rule">
                  {t(`partitionsP${n}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <h2 className="section-heading mb-4 text-2xl sm:text-3xl md:mb-3">
            {t("partitionTypesTitle")}
          </h2>
          <p className="mb-8 max-w-2xl prose-detail md:mb-12">{t("partitionTypesLead")}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partitionTypes.map((item) => (
              <div key={item.title} className="panel-interactive px-5 py-6">
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="acoustique"
        className="section-shell scroll-mt-20 pt-0 sm:pt-0 md:scroll-mt-24 lg:pt-0"
      >
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow mb-3">{t("acousticEyebrow")}</p>
              <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
                {t("acousticTitle")}
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
                {t("acousticLead")}
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-ink-muted">
                {t("acousticBody")}
              </p>
            </div>
            <ul className="space-y-0 border border-line bg-paper p-2 shadow-float">
              {acousticPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 border-b border-line bg-surface px-4 py-4 text-sm text-ink-soft last:border-b-0"
                >
                  <span className="mt-2 h-px w-6 shrink-0 bg-accent/60" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="plafonds"
        className="section-shell scroll-mt-20 pt-0 sm:pt-0 md:scroll-mt-24 lg:pt-0"
      >
        <div className="section-float mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2 md:[&>*:first-child]:order-2">
          <div className="relative min-h-[14rem] sm:min-h-[18rem] md:min-h-[28rem]">
            <Image
              src={assetPath("/images/plafond.jpg")}
              alt={t("ceilingsTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="section-float-pad flex flex-col justify-center">
            <p className="eyebrow mb-3">{t("ceilingsEyebrow")}</p>
            <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
              {t("ceilingsTitle")}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
              {t("ceilingsLead")}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted sm:mt-4">
              {t("ceilingsBody")}
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="list-rule">
                  {t(`ceilingsP${n}`)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {ceilingMats.map((mat) => (
                <span key={mat} className="spec-chip">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="sols"
        className="section-shell scroll-mt-20 pt-0 sm:pt-0 md:scroll-mt-24 lg:pt-0"
      >
        <div className="section-float mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2">
          <div className="relative min-h-[14rem] sm:min-h-[18rem] md:min-h-[28rem]">
            <Image
              src={assetPath("/images/sol-detail.jpg")}
              alt={t("floorsTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="section-float-pad flex flex-col justify-center">
            <p className="eyebrow mb-3">{t("floorsEyebrow")}</p>
            <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
              {t("floorsTitle")}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
              {t("floorsLead")}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted sm:mt-4">
              {t("floorsBody")}
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="list-rule">
                  {t(`floorsP${n}`)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {floorMats.map((mat) => (
                <span key={mat} className="spec-chip">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="complementaires"
        className="section-shell scroll-mt-20 pt-0 sm:pt-0 md:scroll-mt-24 lg:pt-0"
      >
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <p className="eyebrow mb-2">{t("secondaryEyebrow")}</p>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">{t("secondaryTitle")}</h2>
          <p className="mt-4 max-w-2xl prose-detail">{t("secondaryLead")}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="panel-interactive px-5 py-6">
              <h3 className="font-display text-lg text-ink">{t("secondary1Title")}</h3>
              <p className="mt-2 text-sm font-light text-ink-muted">{t("secondary1Text")}</p>
            </div>
            <div className="panel-interactive px-5 py-6">
              <h3 className="font-display text-lg text-ink">{t("secondary2Title")}</h3>
              <p className="mt-2 text-sm font-light text-ink-muted">{t("secondary2Text")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0 sm:pt-0 lg:pt-0 pb-12 sm:pb-14 lg:pb-16">
        <div className="section-float mx-auto max-w-7xl section-float-pad text-center">
          <h2 className="section-heading text-3xl sm:text-4xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-lg prose-detail sm:mt-4">{t("ctaText")}</p>
          <Link href="/contact" className="btn-primary mt-6 sm:mt-8">
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
