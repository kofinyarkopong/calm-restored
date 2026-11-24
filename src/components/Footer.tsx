import Image from "next/image";
import EmailText from "@/components/EmailText";
import Link from "next/link";
import { credit, mainNav, site } from "@/content/site";
import { getServices, getSettings } from "@/lib/cms";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

export default async function Footer() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  return (
    <footer className="bg-aubergine pb-28 pt-20 text-ivory/80 md:pb-12">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/images/brand/logo-full-ivory.png" alt="Calm Restored Wellness, Private Concierge Mental Health Services" width={1330} height={580} className="h-auto w-[230px]" />
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
                <li><Link className="link-underline hover:text-ivory" href="/news">News</Link></li>
                <li><Link className="link-underline hover:text-ivory" href="/private-psychiatrist-ghana">Private psychiatrist in Ghana</Link></li>
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
                  <a href={settings.phone.href} className="flex items-start gap-3 hover:text-ivory">
                    <PhoneIcon className="mt-1 h-4 w-4 text-gold-light" /> {settings.phone.display}
                  </a>
                </li>
                <li>
                  <a href={settings.email.gmailHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-ivory">
                    <MailIcon className="mt-1 h-4 w-4 shrink-0 text-gold-light" /> <span className="min-w-0"><EmailText address={settings.email.address} /></span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <PinIcon className="mt-1 h-4 w-4 shrink-0 text-gold-light" /> {settings.location.display}
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
          <p>© {new Date().getFullYear()} Calm Restored Wellness. All rights reserved.</p>
          <p>Specialist-led by {site.clinician.name}, {site.clinician.title}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-ivory/10 pt-8 text-center text-xs tracking-wide text-ivory/60 sm:flex-row sm:gap-4">
          <span className="inline-flex items-center gap-2.5">
            {credit.logo ? (
              <Image src={credit.logo} alt="" width={256} height={228} className="h-6 w-auto" />
            ) : (
              <svg aria-hidden viewBox="0 0 32 32" className="h-7 w-7">
                <circle cx="16" cy="16" r="11" fill="none" stroke="#3b82c4" strokeWidth="1.6" />
                <path d="M5 16h22M16 5c4 3.5 4 18.5 0 22M16 5c-4 3.5-4 18.5 0 22" fill="none" stroke="#3b82c4" strokeWidth="1.1" />
                <path d="M3 21c7 6 20 5 27-6" fill="none" stroke="#2bb3a3" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            )}
            <span>
              Website by <strong className="font-medium text-ivory/90">{credit.name}</strong>
            </span>
          </span>
          <span aria-hidden className="hidden text-gold-light sm:inline">·</span>
          <a href={credit.phoneHref} className="link-underline text-ivory/80 hover:text-ivory">
            {credit.phoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
