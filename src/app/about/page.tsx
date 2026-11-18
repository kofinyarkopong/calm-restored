import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { ArrowRight, Ornament } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Dr Albert Sedohia, Specialist Psychiatrist",
  description:
    "Dr Albert Sedohia is a Specialist Psychiatrist in Accra with more than a decade of clinical experience in adult psychiatry and addiction psychiatry.",
  alternates: { canonical: "/about" },
};

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const clinicalSettings = ["Korle-Bu Teaching Hospital", "Pantang Hospital", "Accra Psychiatric Hospital"];

const expertise = [
  ["Assessment and diagnosis", "Thorough psychiatric assessment that takes account of physical health, personal history and life circumstances."],
  ["Treatment", "Evidence-informed treatment, including medication management and coordination of psychological support."],
  ["Recovery planning", "Clear, realistic plans developed with each individual and reviewed as needs change."],
  ["Multidisciplinary care", "Working alongside other health professionals so that care remains joined up."],
];

export default function AboutPage() {
  const physician = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${site.url}/#physician`,
    name: site.clinician.name,
    description: `${site.clinician.title}, ${site.clinician.specialisms}`,
    medicalSpecialty: "Psychiatric",
    telephone: site.phone.e164,
    image: `${site.url}/images/doctor/sedohia-white-coat-standing.jpg`,
    address: { "@type": "PostalAddress", addressLocality: `${site.location.area}, ${site.location.city}`, addressCountry: site.location.countryCode },
    url: `${site.url}/about`,
  };

  return (
    <>
      <JsonLd data={physician} />
      <PageHero
        eyebrow="About Dr Sedohia"
        title={<>Dr Albert Sedohia <em className="mt-2 block text-[0.55em] font-light italic text-gold-light">Specialist Psychiatrist</em></>}
        intro={<p>Adult psychiatry and addiction psychiatry, practised with expertise, warmth and a deep respect for every person he sees.</p>}
        image="aboutHero"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact#enquiry" className="btn btn-light">Request a Consultation <ArrowRight /></Link>
          <a href={site.phone.href} className="btn btn-outline-light">Call {site.phone.display}</a>
        </div>
      </PageHero>

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="py-16 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow reveal">An introduction</p>
            <h2 id="intro-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">A specialist who listens first.</h2>
          </div>
          <div className="prose-calm reveal text-lg text-stone lg:col-span-6 lg:col-start-7" style={d(100)}>
            <p className="font-serif text-2xl leading-snug text-plum-ink">
              Dr Albert Sedohia is a Specialist Psychiatrist with more than a decade of clinical experience in the assessment, diagnosis and treatment of mental health conditions.
            </p>
            <p>
              His work spans adult psychiatry and addiction psychiatry. He supports individuals living with conditions such as depression, anxiety, bipolar disorder, psychosis, trauma-related difficulties and substance use disorders, as well as families looking for guidance on how best to help someone they love.
            </p>
            <p>
              Through Calm Restored, he offers a private, specialist-led service in which every person receives time, careful attention and a plan that reflects their own circumstances and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Clinical background */}
      <section aria-labelledby="clinical-heading" className="bg-ivory-deep py-16 md:py-32">
        <div className="container-site grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-5">
            <Photo image="aboutClinical" sizes="(min-width:1024px) 38vw, 90vw" className="aspect-[3/4] rounded-sm" />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow reveal">Clinical background</p>
            <h2 id="clinical-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Experience across major psychiatric settings in Ghana.</h2>
            <p className="reveal mt-6 text-lg text-stone">
              Dr Sedohia&apos;s clinical experience includes work at well-established institutions in Ghanaian mental healthcare, giving him wide exposure to both common and complex presentations.
            </p>
            <ul className="reveal mt-10 border-t border-gold-light/70" style={d(100)}>
              {clinicalSettings.map((c) => (
                <li key={c} className="flex items-center justify-between border-b border-gold-light/70 py-5">
                  <span className="font-serif text-2xl text-plum-ink">{c}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-gold">Clinical experience</span>
                </li>
              ))}
            </ul>
            <p className="reveal mt-8 text-stone">
              He also has professional and consulting experience connected with Nyaho Medical Centre and Accra Medical Centre.
            </p>

            <h3 className="reveal mt-14 text-3xl text-plum">Areas of clinical expertise</h3>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {expertise.map(([t, body], i) => (
                <div key={t} className="reveal" style={d(i * 80)}>
                  <h4 className="font-sans text-sm font-medium uppercase tracking-[0.16em] text-plum">{t}</h4>
                  <p className="mt-2 text-stone">{body}</p>
                </div>
              ))}
            </div>
            <p className="reveal mt-12 text-sm text-stone/80">
              Institutions are named to describe Dr Sedohia&apos;s professional experience only. Their mention does not imply that they endorse or are affiliated with Calm Restored.
            </p>
          </div>
        </div>
      </section>

      {/* Care philosophy */}
      <section aria-labelledby="philosophy-heading" className="relative overflow-hidden bg-aubergine py-24 text-ivory md:py-32">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-plum/45 blur-[140px]" />
        <div className="container-site relative">
          <div className="mx-auto max-w-4xl text-center">
            <Ornament className="reveal ornament-draw mx-auto h-6 w-28 text-gold-light" />
            <p className="eyebrow eyebrow-plain reveal mt-8 !text-gold-light">Care philosophy</p>
            <h2 id="philosophy-heading" className="reveal mt-6 text-4xl leading-tight md:text-6xl">
              Every person deserves to be understood <em className="text-gold-light">before</em> they are treated.
            </h2>
            <p className="reveal mt-6 text-sm uppercase tracking-[0.18em] text-ivory/60">The principle behind Calm Restored</p>
          </div>
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {[
              ["Person before diagnosis", "Symptoms are understood in the context of a whole life: relationships, work, culture, faith and personal goals."],
              ["Decisions made together", "Treatment options are explained clearly, with time to ask questions, so that every decision is an informed one."],
              ["Dignity throughout", "Mental illness and addiction are met without judgement. Care is discreet, courteous and respectful of autonomy."],
            ].map(([t, body], i) => (
              <div key={t} className="reveal border-t border-gold-light/40 pt-8" style={d(i * 120)}>
                <h3 className="text-2xl">{t}</h3>
                <p className="mt-3 text-ivory/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-label="Portraits of Dr Sedohia" className="py-16 md:py-32">
        <div className="container-site grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          <Photo image="aboutPortraitFull" sizes="(min-width:768px) 33vw, 50vw" className="col-span-1 aspect-[2/3] md:col-span-4" />
          <Photo image="aboutAcademic" sizes="(min-width:768px) 33vw, 50vw" className="col-span-1 aspect-[2/3] md:col-span-4 md:mt-20" delay={150} />
          <Photo image="aboutProfile" sizes="(min-width:768px) 33vw, 100vw" className="col-span-2 aspect-[4/3] md:col-span-4 md:aspect-[2/3] md:mt-8" delay={300} />
        </div>
      </section>

      {/* Advocacy and organisational work */}
      <section aria-labelledby="leadership-heading" className="bg-lavender/60 py-16 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow reveal">Advocacy and education</p>
            <h2 id="leadership-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Changing how mental health is understood.</h2>
            <div className="prose-calm reveal mt-8 text-lg text-stone" style={d(100)}>
              <p>
                Beyond the consulting room, Dr Sedohia is committed to mental health advocacy and education. He works to improve public understanding of mental illness and addiction, to reduce stigma and to equip professionals and communities to respond with knowledge and compassion.
              </p>
              <p>
                He also advises organisations on workplace wellbeing, helping employers recognise the signs of stress and burnout and build support that genuinely serves their people.
              </p>
            </div>
            <Link href="/services/advocacy-and-education" className="text-link reveal mt-10">Advocacy and education <ArrowRight /></Link>
          </div>
          <div className="reveal self-end rounded-3xl bg-ivory p-8 ring-1 ring-gold-light/50 md:p-12" style={d(150)}>
            <p className="eyebrow">Organisational leadership</p>
            <h3 className="mt-5 text-3xl text-plum">Chief Executive Officer, Dzidula Health Solutions Ltd</h3>
            <p className="mt-5 text-stone">
              Dr Sedohia serves as Chief Executive Officer of Dzidula Health Solutions Ltd, bringing clinical insight to organisational leadership and to the development of health services.
            </p>
            <Link href="/workplace" className="text-link mt-8">Workplace mental health <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <ContactSection heading="Arrange a consultation with Dr Sedohia." showPhoto={false} />
    </>
  );
}
