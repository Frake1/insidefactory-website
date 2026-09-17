"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";

type Props = {
  variant?: "compact" | "menu";
  onDark?: boolean;
};

export function LanguageSwitcher({ variant = "compact", onDark = false }: Props) {
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
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            className={`touch-target uppercase tracking-wide transition-colors ${
              isMenu ? "px-4 py-2 text-sm" : "px-2.5 py-1.5 text-[0.65rem]"
            } ${
              active
                ? onDark
                  ? "on-media font-semibold"
                  : "font-semibold text-accent"
                : onDark
                  ? "on-media-soft hover:!text-white"
                  : "text-ink-faint hover:text-ink"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {code === "ar" ? "ع" : code.toUpperCase()}
            <span className="sr-only">{localeNames[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
