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
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/92 to-ink" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <p className="mb-3 text-[0.65rem] uppercase tracking-wide text-steel-dim sm:mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="page-hero-title max-w-2xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-steel-muted sm:mt-6 sm:text-base">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="border-t border-steel/10 bg-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 lg:py-24">
          <div className="space-y-8 sm:space-y-10">
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-steel-dim">
                {t("phone")}
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-base text-steel transition-colors hover:text-steel-bright sm:text-lg"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-steel-dim">
                {t("email")}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-base text-steel transition-colors hover:text-steel-bright sm:text-lg"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-steel-dim">
                {t("zone")}
              </p>
              <p className="text-steel-muted">{t("zoneValue")}</p>
            </div>
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-steel-dim">
                {t("delay")}
              </p>
              <p className="text-steel-muted">{t("delayValue")}</p>
            </div>
            <div className="relative hidden min-h-[16rem] overflow-hidden lg:block">
              <Image
                src={assetPath("/images/process-1.jpg")}
                alt={t("siteAlt")}
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>

          <div className="border border-steel/10 bg-ink-soft p-5 sm:p-8 lg:p-12">
            {sent ? (
              <div className="flex min-h-[16rem] flex-col items-center justify-center text-center sm:min-h-[20rem]">
                <p className="font-display text-2xl text-steel-bright sm:text-3xl">
                  {t("successTitle")}
                </p>
                <p className="mt-4 max-w-sm text-sm font-light text-steel-muted">
                  {t("successText")}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <p className="font-display text-2xl text-steel-bright">
                  {t("formTitle")}
                </p>
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
                    className="mb-2 block text-[0.65rem] uppercase tracking-wide text-steel-dim"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full border border-steel/20 bg-ink px-4 py-3 text-base text-steel-bright outline-none transition-colors placeholder:text-steel-dim focus:border-steel/50 sm:text-sm"
                    placeholder={t("messagePlaceholder")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-steel px-8 py-3.5 text-[0.7rem] uppercase tracking-wide text-ink transition-colors hover:bg-steel-bright sm:w-auto"
                >
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
        className="mb-2 block text-[0.65rem] uppercase tracking-wide text-steel-dim"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full border border-steel/20 bg-ink px-4 py-3 text-base text-steel-bright outline-none transition-colors focus:border-steel/50 sm:text-sm"
      />
    </div>
  );
}
