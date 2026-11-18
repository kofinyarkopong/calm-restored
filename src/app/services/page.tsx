import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { ArrowRight } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Addiction psychiatry, adult psychiatric care, urgent consultations, second opinions, concierge care, virtual consultations, home visits, workplace mental health and stress management in Accra.",
  alternates: { canonical: "/services" },
};

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default function ServicesPage() {
  const [addiction, adult, ...rest] = services;
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>Specialist care, <em className="font-light italic text-gold-light">arranged around you.</em></>}
        intro={<p>Eleven areas of specialist practice, each delivered personally by a specialist psychiatrist and coordinated to suit your needs, your schedule and your privacy.</p>}
      />

      {/* Two principal specialisms as editorial features */}
      <section aria-label="Principal specialisms" className="py-16 md:py-32">
        <div className="container-site space-y-16 md:space-y-32">
          {[addiction, adult].map((s, idx) => (
            <article key={s.slug} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
              <div className={`lg:col-span-5 ${idx % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                <Photo image={s.image!} sizes="(min-width:1024px) 38vw, 90vw" className={`aspect-[4/5] ${idx % 2 ? "rounded-b-[999px]" : "rounded-t-[999px]"}`} />
              </div>
              <div className={`lg:col-span-6 ${idx % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
                <p className="reveal font-serif text-xl italic text-gold">{s.number}</p>
                <h2 className="reveal mt-3 text-4xl text-plum md:text-5xl">{s.title}</h2>
                <p className="reveal mt-6 text-lg text-stone">{s.intro}</p>
                <ul className="reveal mt-8 grid gap-x-8 gap-y-2.5 sm:grid-cols-2" style={d(100)}>
                  {s.covers.slice(0, 6).map((c) => (
                    <li key={c} className="flex gap-3 text-plum-ink"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{c}</li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`} className="text-link reveal mt-10">Read more about this service <ArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Remaining services as an index */}
      <section aria-labelledby="more-heading" className="bg-ivory-deep py-16 md:py-32">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 id="more-heading" className="reveal text-4xl text-plum md:text-5xl lg:col-span-6">Further services</h2>
            <p className="reveal text-lg text-stone lg:col-span-5 lg:col-start-8 lg:self-end">
              Each service begins with a conversation about your needs. Select any service to read more.
            </p>
          </div>
          <div className="mt-10 grid gap-px md:mt-14 overflow-hidden rounded-3xl bg-gold-light/50 md:grid-cols-2">
            {rest.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className={`reveal group flex flex-col bg-ivory-deep p-7 transition-colors duration-500 hover:bg-ivory md:p-10 ${rest.length % 2 && i === rest.length - 1 ? "md:col-span-2" : ""}`} style={d((i % 2) * 100)}>
                <span className="font-serif text-lg italic text-gold">{s.number}</span>
                <h3 className="mt-3 text-[1.75rem] text-plum-ink transition-colors group-hover:text-plum">{s.title}</h3>
                <p className="mt-3 flex-1 text-stone">{s.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-plum">
                  Read more <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent note */}
      <section aria-label="Urgent help" className="py-16">
        <div className="container-site">
          <div className="reveal flex flex-col gap-6 rounded-3xl border border-plum/20 bg-lavender/60 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-2xl">
              <h2 className="text-2xl text-plum md:text-3xl">Need to speak to someone urgently?</h2>
              <p className="mt-3 text-stone">
                Please telephone rather than using the online form. If someone is at immediate risk, go to the nearest emergency department.
              </p>
            </div>
            <a href={site.phone.href} className="btn btn-primary shrink-0">Call {site.phone.display}</a>
          </div>
        </div>
      </section>

      <ContactSection showPhoto={false} heading="Not sure which service is right?" intro="That is perfectly normal. Share a brief enquiry and the team will help you find the most suitable starting point." />
    </>
  );
}
