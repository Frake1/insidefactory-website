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
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-4 lg:px-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image
            src={assetPath(siteConfig.logo)}
            alt="Inside Factory"
            width={220}
            height={180}
            className="mb-6 h-[4.5rem] w-auto object-contain brightness-0 sm:h-20"
          />
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            <strong className="font-semibold text-ink">Inside Factory</strong> —{" "}
            {t("blurb")}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("servicesHeading")}</p>
          <ul className="space-y-3 text-sm text-ink-muted">
            {primaryLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mb-3 mt-8">{t("secondaryHeading")}</p>
          <ul className="space-y-3 text-sm text-ink-muted">
            {secondaryLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("aboutHeading")}</p>
          <ul className="space-y-3 text-sm text-ink-muted">
            {aboutLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("contactHeading")}</p>
          <ul className="space-y-3 text-sm text-ink-muted">
            <li>{t("area")}</li>
            <li>
              <a
                href={`tel:${siteConfig.phone}`}
                className="font-medium text-ink transition-colors hover:text-accent"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{t("response")}</li>
          </ul>
          <div className="mt-6 hidden lg:block">
            <p className="eyebrow mb-2">{t("language")}</p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-paper px-4 py-6 text-center text-[0.7rem] leading-relaxed tracking-wide text-ink-faint sm:px-6 lg:px-10">
        © {new Date().getFullYear()} Inside Factory — {t("copyright")}
      </div>
    </footer>
  );
}
