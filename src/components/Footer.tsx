import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { assetPath } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");

  const primaryLinks = [
    { label: t("service1Link"), href: "/services#cloisons" as const },
    { label: t("service2Link"), href: "/services#acoustique" as const },
    { label: t("service3Link"), href: "/services#plafonds" as const },
    { label: t("service4Link"), href: "/services#sols" as const },
  ];

  const secondaryLinks = [
    { label: t("service5Link"), href: "/services#complementaires" as const },
    { label: t("service6Link"), href: "/services#complementaires" as const },
  ];

  const aboutLinks = [
    { label: t("aboutLink"), href: "/a-propos" as const },
    { label: t("contactLink"), href: "/contact" as const },
    { label: t("faqLink"), href: "/faq" as const },
  ];

  return (
    <footer className="border-t border-steel/10 bg-ink-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-4 lg:px-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image
            src={assetPath(siteConfig.logo)}
            alt="Inside Factory"
            width={220}
            height={180}
            className="mb-6 h-[4.5rem] w-auto object-contain sm:h-20"
          />
          <p className="max-w-sm text-sm leading-relaxed text-steel-muted">
            <strong className="font-medium text-steel">Inside Factory</strong> —{" "}
            {t("blurb")}
          </p>
        </div>

        <div>
          <p className="mb-4 font-sans text-[0.65rem] uppercase tracking-wide text-steel-dim">
            {t("servicesHeading")}
          </p>
          <ul className="space-y-3 text-sm text-steel-muted">
            {primaryLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-steel-bright">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-3 mt-8 font-sans text-[0.65rem] uppercase tracking-wide text-steel-dim">
            {t("secondaryHeading")}
          </p>
          <ul className="space-y-3 text-sm text-steel-muted">
            {secondaryLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-steel-bright">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-sans text-[0.65rem] uppercase tracking-wide text-steel-dim">
            {t("aboutHeading")}
          </p>
          <ul className="space-y-3 text-sm text-steel-muted">
            {aboutLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-steel-bright">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-sans text-[0.65rem] uppercase tracking-wide text-steel-dim">
            {t("contactHeading")}
          </p>
          <ul className="space-y-3 text-sm text-steel-muted">
            <li>{t("area")}</li>
            <li>
              <a
                href={`tel:${siteConfig.phone}`}
                className="transition-colors hover:text-steel-bright"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all transition-colors hover:text-steel-bright"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{t("response")}</li>
          </ul>
          <div className="mt-6 hidden lg:block">
            <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-steel-dim">
              {t("language")}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="border-t border-steel/10 px-4 py-6 text-center text-[0.7rem] leading-relaxed tracking-wide text-steel-dim sm:px-6 lg:px-10">
        © {new Date().getFullYear()} Inside Factory — {t("copyright")}
      </div>
    </footer>
  );
}
