import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { absoluteAssetUrl, assetPath } from "@/lib/assets";
import { serviceJsonLd } from "@/lib/seo";
import { absoluteUrl, getLocaleAlternates, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const CORE_IMAGES = [
  "/images/office-partition.jpg",
  "/images/office-meeting.jpg",
  "/images/plafond.jpg",
  "/images/sol-detail.jpg",
] as const;

const CORE_HREFS = [
  "/services#cloisons",
  "/services#acoustique",
  "/services#plafonds",
  "/services#sols",
] as const;

const PORTFOLIO_IMAGES = [
  "/images/office-glass.jpg",
  "/images/office-lobby.jpg",
  "/images/office-open.jpg",
  "/images/plafond-detail.jpg",
  "/images/sol.jpg",
  "/images/cloison-industrielle.jpg",
  "/images/cloison-detail.jpg",
  "/images/office-corridor.jpg",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: {
      canonical: absoluteUrl("/", locale),
      languages: getLocaleAlternates("/"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteUrl("/", locale),
      images: [{ url: absoluteAssetUrl(siteConfig.ogImage), alt: t("heroAlt") }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  const pillars = [1, 2, 3, 4].map((n) => ({
    title: t(`pillar${n}Title`),
    text: t(`pillar${n}Text`),
  }));

  const trust = [1, 2, 3, 4].map((n) => ({
    title: t(`trust${n}Title`),
    text: t(`trust${n}Text`),
  }));

  const aboutPoints = [1, 2, 3].map((n) => t(`aboutPoint${n}`));

  const core = [1, 2, 3, 4].map((n, i) => ({
    title: t(`core${n}Title`),
    text: t(`core${n}Text`),
    detail: t(`core${n}Detail`),
    image: assetPath(CORE_IMAGES[i]),
    href: CORE_HREFS[i],
  }));

  const finishes = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`type${n}`));

  const portfolio = PORTFOLIO_IMAGES.map((img, i) => ({
    src: assetPath(img),
    alt: t(`portfolioAlt${i + 1}`),
    label: t(`portfolioLabel${i + 1}`),
  }));

  const steps = [1, 2, 3, 4].map((n) => ({
    n: `0${n}`,
    title: t(`step${n}Title`),
    text: t(`step${n}Text`),
  }));

  const servicesLd = await serviceJsonLd(locale);

  return (
    <>
      <JsonLd data={servicesLd} />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden grain">
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/hero-office.jpg")}
            alt={t("heroAlt")}
            fill
            priority
            className="hero-media object-cover object-center"
            sizes="100vw"
          />
          <div className="media-scrim-hero" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
          <div className="hero-copy max-w-3xl">
            <p className="on-media-soft mb-4 text-[0.7rem] font-medium uppercase tracking-[0.16em]">
              Inside Factory
            </p>
            <h1 className="page-hero-title-on-dark leading-[1.08]">{t("heroTitle")}</h1>
            <p className="on-media-muted mt-5 max-w-2xl text-sm font-light leading-relaxed sm:mt-6 sm:text-base md:text-lg">
              {t("heroText")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link href="/services#cloisons" className="btn-on-media-solid">
                {t("heroCta")}
              </Link>
              <Link href="/contact" className="btn-on-media">
                {t("heroSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / assurance strip */}
      <section className="section-shell">
        <div className="reveal section-float mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item, i) => (
            <div
              key={item.title}
              className={`border-line px-5 py-7 sm:px-6 sm:py-8 ${
                i > 0 ? "border-t sm:border-t-0" : ""
              } ${i % 2 === 1 ? "sm:border-l" : ""} ${
                i > 0 ? "lg:border-l" : ""
              } ${i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""}`}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
                0{i + 1}
              </p>
              <h2 className="mt-2 font-display text-lg text-ink sm:text-xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core technical pillars */}
      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="eyebrow reveal mb-3">{t("pillarsEyebrow")}</p>
            <h2 className="reveal section-heading text-3xl sm:text-4xl">{t("pillarsTitle")}</h2>
            <p className="reveal reveal-delay-1 mt-4 prose-detail">{t("pillarsLead")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`reveal panel-interactive p-5 sm:p-6 ${
                  i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
                }`}
              >
                <span className="text-[0.65rem] font-semibold tracking-wide text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">{pillar.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty intro */}
      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="reveal section-float mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2">
          <div className="section-float-pad flex flex-col justify-center">
            <p className="eyebrow mb-3 sm:mb-4">{t("aboutEyebrow")}</p>
            <h2 className="section-heading text-3xl sm:text-4xl">{t("aboutTitle")}</h2>
            <p className="mt-5 prose-detail">{t("aboutText")}</p>
            <p className="mt-4 prose-detail">{t("aboutText2")}</p>
            <ul className="mt-6 space-y-3">
              {aboutPoints.map((point) => (
                <li key={point} className="list-rule">
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/a-propos" className="btn-ghost mt-6 sm:mt-8">
              {t("aboutLink")}
            </Link>
          </div>
          <div className="relative min-h-[16rem] sm:min-h-[20rem] md:min-h-full md:min-h-[26rem]">
            <Image
              src={assetPath("/images/office-partition.jpg")}
              alt={t("aboutTitle")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Core expertise */}
      <section id="expertise" className="section-shell scroll-mt-20 pt-0 sm:pt-0 md:scroll-mt-24 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="eyebrow reveal mb-3">{t("coreEyebrow")}</p>
            <h2 className="reveal section-heading">{t("coreTitle")}</h2>
            <p className="reveal reveal-delay-1 mt-4 prose-detail">{t("coreLead")}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {core.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className={`reveal group panel-interactive grid overflow-hidden sm:grid-cols-[0.85fr_1.15fr] ${
                  i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
                }`}
              >
                <div className="relative min-h-[11rem] sm:min-h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-7">
                  <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                    {item.text}
                  </p>
                  <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-ink-faint">
                    {item.detail}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="eyebrow reveal mb-3">{t("sectorEyebrow")}</p>
            <h2 className="reveal section-heading text-2xl sm:text-3xl md:text-4xl">
              {t("sectorTitle")}
            </h2>
            <p className="reveal reveal-delay-1 mt-4 prose-detail">{t("sectorLead")}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            <Link
              href="/services#cloisons"
              className="reveal group card-lift relative min-h-[17rem] overflow-hidden sm:min-h-[20rem]"
            >
              <Image
                src={assetPath("/images/office-glass.jpg")}
                alt={t("sectorOfficeTitle")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="media-scrim-card" />
              <div className="absolute inset-x-0 bottom-0 z-[1] p-6 sm:p-8">
                <h3 className="on-media font-display text-2xl sm:text-3xl">
                  {t("sectorOfficeTitle")}
                </h3>
                <p className="on-media-muted mt-3 max-w-md text-sm font-light">
                  {t("sectorOfficeText")}
                </p>
              </div>
            </Link>
            <Link
              href="/services#cloisons"
              className="reveal reveal-delay-1 group card-lift relative min-h-[17rem] overflow-hidden sm:min-h-[20rem]"
            >
              <Image
                src={assetPath("/images/cloison-industrielle.jpg")}
                alt={t("sectorIndustrialTitle")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="media-scrim-card" />
              <div className="absolute inset-x-0 bottom-0 z-[1] p-6 sm:p-8">
                <h3 className="on-media font-display text-2xl sm:text-3xl">
                  {t("sectorIndustrialTitle")}
                </h3>
                <p className="on-media-muted mt-3 max-w-md text-sm font-light">
                  {t("sectorIndustrialText")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Finishes */}
      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="eyebrow reveal mb-3">{t("finishesEyebrow")}</p>
            <h2 className="reveal section-heading text-2xl sm:text-3xl md:text-4xl">
              {t("finishesTitle")}
            </h2>
            <p className="reveal reveal-delay-1 mt-4 prose-detail">{t("finishesLead")}</p>
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {finishes.map((type) => (
              <div
                key={type}
                className="border border-line bg-paper px-3 py-5 text-center text-sm font-medium text-ink-soft shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float sm:px-4 sm:py-6"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary services */}
      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <p className="eyebrow reveal mb-2">{t("secondaryEyebrow")}</p>
          <h2 className="reveal font-display text-2xl text-ink sm:text-3xl">
            {t("secondaryTitle")}
          </h2>
          <p className="reveal reveal-delay-1 mt-4 max-w-2xl prose-detail">
            {t("secondaryLead")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="reveal panel-interactive px-5 py-6 sm:px-6 sm:py-7">
              <h3 className="font-display text-lg text-ink sm:text-xl">
                {t("secondary1Title")}
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-muted">
                {t("secondary1Text")}
              </p>
            </div>
            <div className="reveal reveal-delay-1 panel-interactive px-5 py-6 sm:px-6 sm:py-7">
              <h3 className="font-display text-lg text-ink sm:text-xl">
                {t("secondary2Title")}
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-muted">
                {t("secondary2Text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-shell pt-0 sm:pt-0 lg:pt-0">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="eyebrow reveal mb-3">{t("portfolioEyebrow")}</p>
            <h2 className="reveal section-heading">{t("portfolioTitle")}</h2>
            <p className="reveal reveal-delay-1 mt-4 prose-detail">{t("portfolioLead")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {portfolio.map((item, i) => (
              <figure
                key={item.src}
                className={`reveal group card-lift relative overflow-hidden bg-paper ${
                  i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <figcaption className="border border-t-0 border-line bg-surface px-3 py-2.5 text-xs text-ink-muted">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-shell pt-0 sm:pt-0 lg:pt-0 pb-12 sm:pb-14 lg:pb-16">
        <div className="section-float mx-auto max-w-7xl section-float-pad">
          <p className="eyebrow reveal mb-3">{t("processEyebrow")}</p>
          <h2 className="reveal section-heading max-w-3xl text-3xl sm:text-4xl">
            {t("processTitle")}
          </h2>
          <p className="reveal reveal-delay-1 mt-4 max-w-2xl prose-detail">
            {t("processLead")}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`reveal panel-interactive p-5 sm:p-6 ${
                  i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
                }`}
              >
                <span className="text-[0.7rem] font-semibold tracking-wide text-accent">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-xl text-ink sm:text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/office-corridor.jpg")}
            alt={t("ctaAlt")}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="media-scrim-cta" />
        </div>
        <div className="relative z-[1] mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-10 lg:py-28">
          <h2 className="reveal page-hero-title-on-dark text-balance text-3xl sm:text-4xl md:text-5xl">
            {t("ctaTitle")}
          </h2>
          <p className="reveal reveal-delay-1 on-media-muted mx-auto mt-4 max-w-lg text-sm font-light">
            {t("ctaText")}
          </p>
          <Link href="/contact" className="reveal reveal-delay-2 btn-on-media-solid mt-8 sm:mt-10">
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
