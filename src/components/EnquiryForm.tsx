"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { serviceOptions } from "@/content/services";
import { site } from "@/content/site";
import { consultationFormats, contactMethods, validateEnquiry, type FieldErrors } from "@/lib/enquiry-schema";
import { ArrowRight, PhoneIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable" | "rate_limited";

const fieldOrder = ["name", "contactMethod", "email", "phone", "service", "format", "message", "consent"] as const;

export default function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [method, setMethod] = useState<string>("Telephone");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error" || status === "unavailable" || status === "rate_limited") statusRef.current?.focus();
  }, [status]);

  const focusFirstError = (errs: FieldErrors) => {
    const first = fieldOrder.find((k) => errs[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      contactMethod: String(fd.get("contactMethod") ?? ""),
      service: String(fd.get("service") ?? ""),
      format: String(fd.get("format") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
    };

    const parsed = validateEnquiry(data);
    if (!parsed.success) {
      setErrors(parsed.errors);
      focusFirstError(parsed.errors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: String(fd.get("website") ?? ""), startedAt: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { status?: string; errors?: FieldErrors };
      if (res.ok && body.status === "ok") {
        setStatus("success");
        formRef.current?.reset();
      } else if (body.status === "invalid" && body.errors) {
        setErrors(body.errors);
        setStatus("idle");
        focusFirstError(body.errors);
      } else if (body.status === "unavailable") {
        setStatus("unavailable");
      } else if (body.status === "rate_limited") {
        setStatus("rate_limited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold-light/70 bg-white/70 p-8 md:p-10" role="status">
        <h3 ref={successRef} tabIndex={-1} className="font-serif text-3xl text-plum focus:outline-none">
          Thank you for contacting Calm Restored Wellness.
        </h3>
        <p className="mt-4 text-stone">
          Your enquiry has been submitted. Our team will contact you using your preferred details. Your appointment is not confirmed until agreed with the team.
        </p>
        <p className="mt-6 text-sm text-stone">
          If your situation becomes urgent, please call <a className="text-plum underline" href={site.phone.href}>{site.phone.display}</a>. In an emergency, go to the nearest emergency department.
        </p>
        <button type="button" onClick={() => { setStatus("idle"); startedAt.current = Date.now(); }} className="text-link mt-8">
          Send another enquiry
        </button>
      </div>
    );
  }

  const needEmail = method === "Email";
  const needPhone = method === "Telephone" || method === "WhatsApp";
  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="field-error">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof FieldErrors, describedBy?: string) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [errors[k] ? `${k}-error` : "", describedBy ?? ""].filter(Boolean).join(" ") || undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "submitting"} className="space-y-6">
      {(status === "error" || status === "unavailable" || status === "rate_limited") && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-xl border border-[#a3242c]/30 bg-[#a3242c]/5 p-5 text-[0.95rem] focus:outline-none">
          {status === "unavailable" && (
            <p>Online enquiries are temporarily unavailable. Please call us on <a className="font-medium text-plum underline" href={site.phone.href}>{site.phone.display}</a>.</p>
          )}
          {status === "rate_limited" && (
            <p>We have received several enquiries from this connection in a short time. Please wait a few minutes, or call us on <a className="font-medium text-plum underline" href={site.phone.href}>{site.phone.display}</a>.</p>
          )}
          {status === "error" && (
            <p>Sorry, your enquiry could not be sent. Nothing has been submitted. Please try again, call us on <a className="font-medium text-plum underline" href={site.phone.href}>{site.phone.display}</a> or email <a className="font-medium text-plum underline" href={site.email.href}>{site.email.address}</a>.</p>
          )}
        </div>
      )}

      <p className="text-sm text-stone">Fields marked <span aria-hidden className="text-plum">*</span><span className="sr-only">with an asterisk</span> are required.</p>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="field-label">Name <span aria-hidden className="text-plum">*</span></label>
        <input id="name" name="name" type="text" autoComplete="name" required className="field" {...a11y("name")} />
        {err("name")}
      </div>

      <fieldset {...a11y("contactMethod")}>
        <legend className="field-label">Preferred contact method <span aria-hidden className="text-plum">*</span></legend>
        <div className="flex flex-wrap gap-2.5">
          {contactMethods.map((m) => (
            <label key={m} className="relative cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                value={m}
                checked={method === m}
                onChange={() => setMethod(m)}
                className="peer absolute inset-0 opacity-0"
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-[#d9cfc1] bg-[#fffdf9] px-5 text-[0.95rem] transition-colors peer-checked:border-plum peer-checked:bg-plum peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                {m}
              </span>
            </label>
          ))}
        </div>
        {err("contactMethod")}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="field-label">
            Email address {needEmail ? <span aria-hidden className="text-plum">*</span> : <span className="font-normal text-stone">(optional)</span>}
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required={needEmail} className="field" {...a11y("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            Telephone number {needPhone ? <span aria-hidden className="text-plum">*</span> : <span className="font-normal text-stone">(optional)</span>}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required={needPhone} placeholder="+233" className="field" {...a11y("phone")} />
          {err("phone")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="field-label">Service of interest <span aria-hidden className="text-plum">*</span></label>
          <select id="service" name="service" required defaultValue={defaultService ?? ""} className="field" {...a11y("service")}>
            <option value="" disabled>Please choose</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {err("service")}
        </div>
        <div>
          <label htmlFor="format" className="field-label">Preferred consultation format <span aria-hidden className="text-plum">*</span></label>
          <select id="format" name="format" required defaultValue="" className="field" {...a11y("format")}>
            <option value="" disabled>Please choose</option>
            {consultationFormats.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          {err("format")}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="field-label">Brief message <span className="font-normal text-stone">(optional)</span></label>
        <p id="message-hint" className="mb-2 text-sm text-stone">
          Please share only a brief enquiry. Avoid including detailed medical information or sensitive records.
        </p>
        <textarea id="message" name="message" rows={4} maxLength={1000} className="field resize-y" {...a11y("message", "message-hint")} />
        {err("message")}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
          <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-plum" {...a11y("consent")} />
          <span>
            I agree that Calm Restored Wellness may contact me about this enquiry, as described in the{" "}
            <Link href="/privacy" className="text-plum underline underline-offset-2">privacy notice</Link>.{" "}
            <span aria-hidden className="text-plum">*</span>
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="space-y-4 border-t border-gold-light/50 pt-6">
        <p className="text-sm leading-relaxed text-stone">
          This form is for appointment enquiries and is not monitored continuously. For an immediate emergency, seek urgent help at the nearest emergency department.
        </p>
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
          {status === "submitting" ? (
            <>
              <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
              Sending enquiry
            </>
          ) : (
            <>
              Send Enquiry <ArrowRight />
            </>
          )}
        </button>
        <div aria-live="polite" className="sr-only">{status === "submitting" ? "Sending your enquiry" : ""}</div>
      </div>
    </form>
  );
}

export function EnquiryUnavailable() {
  return (
    <div className="rounded-2xl border border-gold-light/70 bg-white/70 p-8 md:p-10">
      <h3 className="font-serif text-2xl text-plum md:text-3xl">Online enquiries are temporarily unavailable.</h3>
      <p className="mt-4 text-stone">
        Please telephone the team or email <a className="text-plum underline" href={site.email.href}>{site.email.address}</a>. We will be glad to discuss your needs and suitable consultation options.
      </p>
      <a href={site.phone.href} className="btn btn-primary mt-8">
        <PhoneIcon /> Call {site.phone.display}
      </a>
    </div>
  );
}
