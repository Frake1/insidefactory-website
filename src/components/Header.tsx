"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { assetPath } from "@/lib/assets";
import { siteConfig } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/services#cloisons" as const, label: t("partitions") },
    { href: "/services#plafonds" as const, label: t("ceilings") },
    { href: "/services#sols" as const, label: t("floors") },
    { href: "/a-propos" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
    { href: "/faq" as const, label: t("faq") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          scrolled || open
            ? "border-b border-steel/10 bg-ink/95"
            : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[5.25rem] sm:px-6 lg:h-24 lg:px-10">
          <Link href="/" className="relative z-10 block shrink-0" onClick={closeMenu}>
            <Image
              src={assetPath(siteConfig.logo)}
              alt={t("logoAlt")}
              width={200}
              height={164}
              className="h-11 w-auto object-contain sm:h-14 md:h-16 lg:h-[4.25rem]"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-5 xl:flex xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[0.7rem] uppercase tracking-wide text-steel-muted transition-colors duration-300 hover:text-steel-bright"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="border border-steel/35 px-5 py-2.5 font-sans text-[0.7rem] uppercase tracking-wide text-steel transition-all duration-300 hover:border-steel hover:bg-steel/10 hover:text-steel-bright"
            >
              {t("cta")}
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="touch-target relative z-10 flex flex-col items-center justify-center gap-1.5 xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-px w-6 bg-steel transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-steel transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-steel transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-[60] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("openMenu")}
        >
          <button
            type="button"
            aria-label={t("closeMenu")}
            className="absolute inset-0 bg-ink/80"
            onClick={closeMenu}
          />

          <div
            className="absolute inset-x-0 bottom-0 overflow-y-auto bg-ink"
            style={{
              top: "calc(4rem + env(safe-area-inset-top))",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <nav className="relative z-10 flex flex-col px-6 pb-10 pt-6 sm:px-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="border-b border-steel/10 py-5 font-display text-2xl tracking-wide text-steel-bright transition-colors hover:text-steel sm:text-3xl"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mt-8 inline-flex min-h-[3rem] w-full items-center justify-center bg-steel px-6 py-3 text-xs uppercase tracking-wide text-ink transition-colors hover:bg-steel-bright sm:w-fit"
              >
                {t("cta")}
              </Link>
              <div className="mt-10 border-t border-steel/10 pt-8">
                <p className="mb-3 text-[0.65rem] uppercase tracking-wide text-steel-dim">
                  {t("language")}
                </p>
                <LanguageSwitcher variant="menu" />
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
