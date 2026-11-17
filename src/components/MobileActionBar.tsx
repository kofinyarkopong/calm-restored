"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { MailIcon, PhoneIcon } from "./Icons";

/** Discreet Call and Enquire bar on small screens, shown after the hero. */
export default function MobileActionBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 overflow-hidden rounded-full bg-plum-ink/95 text-ivory shadow-[0_18px_40px_-16px_rgba(34,10,49,0.7)] backdrop-blur transition-all duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={site.phone.href} className="flex min-h-12 items-center justify-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.16em]">
        <PhoneIcon /> Call
      </a>
      <Link href="/contact#enquiry" className="flex min-h-12 items-center justify-center gap-2 border-l border-ivory/15 text-[0.78rem] font-medium uppercase tracking-[0.16em]">
        <MailIcon /> Enquire
      </Link>
    </div>
  );
}
