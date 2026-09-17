"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { assetPath } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/espace-2.jpg")}
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
          <h1 className="page-hero-title-on-dark max-w-2xl">{t("title")}</h1>
          <p className="on-media-muted mt-4 max-w-lg text-sm font-light leading-relaxed sm:mt-6 sm:text-base">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="section-float section-float-pad space-y-8">
            <div>
              <p className="eyebrow mb-2">{t("phone")}</p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-base font-medium text-ink transition-colors hover:text-accent sm:text-lg"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">{t("email")}</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-base font-medium text-ink transition-colors hover:text-accent sm:text-lg"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">{t("zone")}</p>
              <p className="text-ink-muted">{t("zoneValue")}</p>
            </div>
            <div>
              <p className="eyebrow mb-2">{t("delay")}</p>
              <p className="text-ink-muted">{t("delayValue")}</p>
            </div>
            <div className="border border-line bg-accent-mist p-5 shadow-soft">
              <p className="text-sm font-medium text-ink">{t("assuranceTitle")}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-muted">
                {t("assuranceText")}
              </p>
            </div>
            <div className="relative hidden min-h-[16rem] overflow-hidden shadow-float lg:block">
              <Image
                src={assetPath("/images/process-1.jpg")}
                alt={t("siteAlt")}
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>

          <div className="section-float section-float-pad sm:p-8 lg:p-12">
            {sent ? (
              <div className="flex min-h-[16rem] flex-col items-center justify-center text-center sm:min-h-[20rem]">
                <p className="font-display text-2xl text-ink sm:text-3xl">{t("successTitle")}</p>
                <p className="mt-4 max-w-sm text-sm font-light text-ink-muted">
                  {t("successText")}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <p className="font-display text-2xl text-ink">{t("formTitle")}</p>
                <p className="text-sm font-light text-ink-muted">{t("formLead")}</p>
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <Field label={t("lastName")} name="lastName" required />
                  <Field label={t("firstName")} name="firstName" required />
                  <Field label={t("email")} name="email" type="email" required />
                  <Field label={t("phoneField")} name="phone" type="tel" />
                  <Field label={t("company")} name="company" />
                  <Field
                    label={t("country")}
                    name="country"
                    defaultValue={t("countryDefault")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wide text-ink-faint"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent/40 sm:text-sm"
                    placeholder={t("messagePlaceholder")}
                  />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  {t("submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wide text-ink-faint"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition-colors focus:border-accent/40 sm:text-sm"
      />
    </div>
  );
}
