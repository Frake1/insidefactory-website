"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";

type Props = {
  variant?: "compact" | "menu";
};

export function LanguageSwitcher({ variant = "compact" }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const isMenu = variant === "menu";

  return (
    <div
      className={`flex items-center ${isMenu ? "gap-2" : "gap-1"}`}
      role="navigation"
      aria-label="Language"
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={`touch-target rounded-sm uppercase tracking-wide transition-colors ${
            isMenu
              ? "px-4 py-2 text-sm"
              : "px-2.5 py-1.5 text-[0.65rem]"
          } ${
            locale === code
              ? "text-steel-bright"
              : "text-steel-dim hover:text-steel"
          }`}
          aria-current={locale === code ? "true" : undefined}
        >
          {code === "ar" ? "ع" : code.toUpperCase()}
          <span className="sr-only">{localeNames[code]}</span>
        </button>
      ))}
    </div>
  );
}
