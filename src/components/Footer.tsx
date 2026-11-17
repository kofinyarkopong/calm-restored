import Image from "next/image";
import Link from "next/link";
import { mainNav, site } from "@/content/site";
import { services } from "@/content/services";
import { PhoneIcon, PinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-aubergine pb-28 pt-20 text-ivory/80 md:pb-12">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/images/brand/logo-full-ivory.png" alt="Calm Restored, Private Concierge Mental Health Services" width={262} height={118} className="h-auto w-[220px]" />
            <p className="mt-8 max-w-sm font-serif text-xl italic leading-snug text-ivory">{site.supportingLine}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="eyebrow eyebrow-plain mb-5 !text-gold-light">Explore</h2>
              <ul className="space-y-2.5 text-[0.95rem]">
                <li><Link className="link-underline hover:text-ivory" href="/">Home</Link></li>
                {mainNav.map((n) => (
                  <li key={n.href}><Link className="link-underline hover:text-ivory" href={n.href}>{n.label}</Link></li>
                ))}
                <li><Link className="link-underline hover:text-ivory" href="/privacy">Privacy Notice</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow eyebrow-plain mb-5 !text-gold-light">Services</h2>
              <ul className="space-y-2.5 text-[0.95rem]">
                {services.slice(0, 7).map((s) => (
                  <li key={s.slug}><Link className="link-underline hover:text-ivory" href={`/services/${s.slug}`}>{s.title}</Link></li>
                ))}
                <li><Link className="link-underline text-gold-light hover:text-ivory" href="/services">All services</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow eyebrow-plain mb-5 !text-gold-light">Contact</h2>
              <ul className="space-y-4 text-[0.95rem]">
                <li>
                  <a href={site.phone.href} className="flex items-start gap-3 hover:text-ivory">
                    <PhoneIcon className="mt-1 h-4 w-4 text-gold-light" /> {site.phone.display}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <PinIcon className="mt-1 h-4 w-4 shrink-0 text-gold-light" /> {site.location.display}
                </li>
                <li><Link href="/contact#enquiry" className="link-underline text-ivory">Request a consultation</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-ivory/15 p-5 text-sm leading-relaxed text-ivory/75 md:p-6">
          <strong className="font-medium text-ivory">In an emergency:</strong> if you or someone else is at immediate risk, go to the nearest emergency department or contact emergency services. This website and its enquiry form are not monitored continuously.
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-xs tracking-wide text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Calm Restored. All rights reserved.</p>
          <p>Specialist-led by {site.clinician.name}, {site.clinician.title}</p>
        </div>
      </div>
    </footer>
  );
}
