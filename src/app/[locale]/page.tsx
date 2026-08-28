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

  const core = [1, 2, 3, 4].map((n, i) => ({
    title: t(`core${n}Title`),
    text: t(`core${n}Text`),
    image: assetPath(CORE_IMAGES[i]),
    href: CORE_HREFS[i],
  }));

  const finishes = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`type${n}`));

  const portfolio = PORTFOLIO_IMAGES.map((img, i) => ({
    src: assetPath(img),
    alt: t(`portfolioAlt${i + 1}`),
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
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/35" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
          <div className="hero-copy max-w-3xl">
            <h1 className="page-hero-title leading-[1.1]">{t("heroTitle")}</h1>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-steel sm:mt-6 sm:text-base md:text-lg">
              {t("heroText")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/services#cloisons"
                className="inline-flex min-h-[3rem] items-center justify-center bg-steel px-7 py-3.5 text-[0.7rem] uppercase tracking-wide text-ink transition-colors hover:bg-steel-bright"
              >
                {t("heroCta")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[3rem] items-center justify-center border border-steel/40 px-7 py-3.5 text-[0.7rem] uppercase tracking-wide text-steel transition-colors hover:border-steel hover:text-steel-bright"
              >
                {t("heroSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core technical pillars */}
      <section className="border-t border-steel/10 bg-ink-soft">
        <div className="mx-auto grid max-w-7xl gap-px bg-steel/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`reveal bg-ink-soft px-5 py-8 sm:px-6 sm:py-10 ${
                i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
              }`}
            >
              <span className="font-sans text-[0.65rem] tracking-wide text-steel-dim">
                0{i + 1}
              </span>
              <h2 className="mt-3 font-display text-xl text-steel-bright sm:text-2xl">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialty intro */}
      <section className="border-t border-steel/10 bg-ink">
        <div className="section-pad mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="reveal">
            <p className="mb-3 text-[0.65rem] uppercase tracking-wide text-steel-dim sm:mb-4">
              {t("aboutEyebrow")}
            </p>
            <h2 className="section-heading text-3xl sm:text-4xl">{t("aboutTitle")}</h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-steel-muted sm:text-base">
              {t("aboutText")}
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-steel-muted sm:text-base">
              {t("aboutText2")}
            </p>
            <Link
              href="/a-propos"
              className="mt-6 inline-flex min-h-[2.75rem] items-center text-sm text-steel transition-colors hover:text-steel-bright sm:mt-8"
            >
              {t("aboutLink")}
            </Link>
          </div>
          <div className="reveal reveal-delay-1 relative min-h-[16rem] overflow-hidden sm:min-h-[20rem] md:min-h-[24rem]">
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

      {/* Core expertise — 4 specialties */}
      <section id="expertise" className="scroll-mt-20 border-t border-steel/10 bg-ink-soft md:scroll-mt-24">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="reveal section-heading mb-10 md:mb-14">{t("coreTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {core.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className={`reveal group grid overflow-hidden border border-steel/10 bg-ink transition-colors hover:border-steel/30 sm:grid-cols-[0.9fr_1.1fr] ${
                  i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
                }`}
              >
                <div className="relative min-h-[10rem] sm:min-h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-7">
                  <h3 className="font-display text-2xl text-steel-bright">{item.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted">
                    {item.text}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hoyez-style sectors */}
      <section className="border-t border-steel/10 bg-ink">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="reveal section-heading mb-10 text-2xl sm:text-3xl md:mb-12">
            {t("sectorTitle")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <Link
              href="/services#cloisons"
              className="reveal group relative min-h-[16rem] overflow-hidden border border-steel/10 sm:min-h-[18rem]"
            >
              <Image
                src={assetPath("/images/office-glass.jpg")}
                alt={t("sectorOfficeTitle")}
                fill
                className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-display text-2xl text-steel-bright sm:text-3xl">
                  {t("sectorOfficeTitle")}
                </h3>
                <p className="mt-3 max-w-md text-sm font-light text-steel">{t("sectorOfficeText")}</p>
              </div>
            </Link>
            <Link
              href="/services#cloisons"
              className="reveal reveal-delay-1 group relative min-h-[16rem] overflow-hidden border border-steel/10 sm:min-h-[18rem]"
            >
              <Image
                src={assetPath("/images/cloison-industrielle.jpg")}
                alt={t("sectorIndustrialTitle")}
                fill
                className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-display text-2xl text-steel-bright sm:text-3xl">
                  {t("sectorIndustrialTitle")}
                </h3>
                <p className="mt-3 max-w-md text-sm font-light text-steel">
                  {t("sectorIndustrialText")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Finishes */}
      <section className="border-t border-steel/10 bg-ink-soft">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="reveal section-heading mb-8 text-2xl sm:text-3xl md:mb-10">
            {t("finishesTitle")}
          </h2>
          <div className="reveal reveal-delay-1 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {finishes.map((type) => (
              <div
                key={type}
                className="border border-steel/15 bg-ink px-3 py-4 text-center text-sm text-steel sm:px-4 sm:py-5"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary services — de-emphasized */}
      <section className="border-t border-steel/10 bg-ink">
        <div className="section-pad mx-auto max-w-7xl">
          <p className="reveal mb-2 text-[0.65rem] uppercase tracking-wide text-steel-dim">
            {t("secondaryTitle")}
          </p>
          <h2 className="reveal font-display text-2xl text-steel-bright sm:text-3xl">
            {t("secondaryTitle")}
          </h2>
          <p className="reveal reveal-delay-1 mt-4 max-w-2xl text-sm font-light leading-relaxed text-steel-muted">
            {t("secondaryLead")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="reveal border border-steel/10 bg-ink-soft px-5 py-6">
              <h3 className="font-display text-lg text-steel">{t("secondary1Title")}</h3>
              <p className="mt-2 text-sm font-light text-steel-muted">{t("secondary1Text")}</p>
            </div>
            <div className="reveal reveal-delay-1 border border-steel/10 bg-ink-soft px-5 py-6">
              <h3 className="font-display text-lg text-steel">{t("secondary2Title")}</h3>
              <p className="mt-2 text-sm font-light text-steel-muted">{t("secondary2Text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="border-t border-steel/10 bg-ink-soft">
        <div className="section-pad mx-auto max-w-7xl">
          <h2 className="reveal section-heading mb-10 md:mb-14">{t("portfolioTitle")}</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
            {portfolio.map((item, i) => (
              <div
                key={item.src}
                className={`reveal relative aspect-[4/3] overflow-hidden ${
                  i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-steel/10 bg-ink">
        <div className="section-pad mx-auto max-w-7xl">
          <p className="reveal mb-3 text-[0.65rem] uppercase tracking-wide text-steel-dim">
            {t("processEyebrow")}
          </p>
          <h2 className="reveal section-heading max-w-3xl text-3xl sm:text-4xl">
            {t("processTitle")}
          </h2>
          <p className="reveal reveal-delay-1 mt-4 max-w-2xl text-sm font-light leading-relaxed text-steel-muted sm:text-base">
            {t("processLead")}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`reveal border-t border-steel/20 pt-6 ${
                  i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""
                }`}
              >
                <span className="font-sans text-[0.7rem] tracking-wide text-steel-dim">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-xl text-steel-bright sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-steel-muted">
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
          <div className="absolute inset-0 bg-ink/80" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-10 lg:py-28">
          <h2 className="reveal section-heading text-balance">{t("ctaTitle")}</h2>
          <p className="reveal reveal-delay-1 mx-auto mt-4 max-w-lg text-sm font-light text-steel-muted">
            {t("ctaText")}
          </p>
          <Link
            href="/contact"
            className="reveal reveal-delay-2 mt-8 inline-flex min-h-[3rem] items-center justify-center bg-steel px-8 py-3.5 text-[0.7rem] uppercase tracking-wide text-ink transition-colors hover:bg-steel-bright sm:mt-10"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
