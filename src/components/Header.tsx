"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/content/site";
import { ArrowRight, PhoneIcon } from "./Icons";

export default function Header({ phone, location }: { phone: { display: string; href: string }; location: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = menuRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []).filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ivory focus:px-5 focus:py-3 focus:text-plum"
      >
        Skip to main content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-[var(--ease-calm)] ${
          solid ? "bg-ivory/95 py-3 shadow-[0_1px_0_rgba(168,130,58,0.25)] backdrop-blur-md" : "bg-transparent py-5 md:py-7"
        }`}
      >
        <div className="container-site flex items-center justify-between gap-6">
          <Link href="/" aria-label="Calm Restored Wellness, home" className="relative block h-12 w-[127px] shrink-0 md:h-[56px] md:w-[148px]">
            <Image
              src="/images/brand/logo-horizontal-ivory.png"
              alt=""
              fill
              priority
              sizes="150px"
              className={`object-contain object-left transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/images/brand/logo-horizontal.png"
              alt=""
              fill
              priority
              sizes="150px"
              className={`object-contain object-left transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-7 2xl:gap-9">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`link-underline whitespace-nowrap py-1 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors ${
                      solid ? "text-plum-ink" : "text-ivory"
                    } ${isActive(item.href) ? "bg-[length:100%_1px]" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={phone.href}
              className={`hidden items-center gap-2 whitespace-nowrap text-sm tracking-wide 2xl:flex ${solid ? "text-plum-ink" : "text-ivory"}`}
            >
              <PhoneIcon /> {phone.display}
            </a>
            <Link href="/contact#enquiry" className={`btn hidden whitespace-nowrap sm:inline-flex ${solid ? "btn-primary" : "btn-light"} !min-h-11 !px-5`}>
              Request a Consultation
            </Link>
            <a
              href={phone.href}
              aria-label={`Call Calm Restored Wellness on ${phone.display}`}
              className={`grid h-11 w-11 place-items-center rounded-full border sm:hidden ${
                solid ? "border-plum/30 text-plum" : "border-ivory/50 text-ivory"
              }`}
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className={`relative z-[60] grid h-11 w-11 place-items-center rounded-full border xl:hidden ${
                open ? "border-ivory/50 text-ivory" : solid ? "border-plum/30 text-plum" : "border-ivory/50 text-ivory"
              }`}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-[55] overflow-y-auto bg-aubergine text-ivory xl:hidden"
      >
        <div className="container-site flex min-h-full flex-col pb-10 pt-28">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              <li>
                <Link href="/" className="block border-b border-ivory/10 py-4 font-serif text-3xl">
                  Home
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block border-b border-ivory/10 py-4 font-serif text-3xl aria-[current=page]:text-gold-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <Link href="/contact#enquiry" className="btn btn-light w-full">
              Request a Consultation <ArrowRight />
            </Link>
            <a href={phone.href} className="btn btn-outline-light w-full">
              <PhoneIcon /> Call {phone.display}
            </a>
            <p className="pt-4 text-center text-sm text-ivory/60">{location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
