import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import ContactSection from "@/components/ContactSection";
import { ArrowRight } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { services } from "@/content/services";
import { site } from "@/content/site";

const path = "/private-psychiatrist-ghana";

export const metadata: Metadata = {
  title: { absolute: "Private Psychiatric Care in Ghana | Private Psychiatrist in Accra" },
  description:
    "Looking for a private psychiatrist in Ghana? Dr Albert Sedohia, Specialist Psychiatrist, offers confidential private psychiatric care in Accra: adult psychiatry, addiction treatment, ADHD assessment, home visits and virtual consultations.",
  alternates: { canonical: path },
  openGraph: { title: "Private Psychiatric Care in Ghana | Calm Restored Wellness", url: path },
};

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const reasons = [
  ["Specialist-led", "You are seen by a Specialist Psychiatrist, not passed between departments. The same clinician follows your care over time."],
  ["Discreet and confidential", "Appointments are private, and your information is shared only with your consent or where the law or professional duties require it."],
  ["Time to be heard", "Unhurried appointments allow a full assessment of your health, history and circumstances before any plan is agreed."],
  ["Care that comes to you", "Consultations in Accra, home visits and secure video appointments, each offered where clinically suitable."],
];

const featured = ["adult-psychiatry", "addiction-psychiatry", "adhd-assessment", "urgent-psychiatric-care", "second-opinions", "virtual-consultations", "home-visits", "concierge-psychiatric-care"];

const ghanaFaqs = [
  {
    q: "Is there a private psychiatrist in Accra?",
    a: `Yes. ${site.clinician.name} is a ${site.clinician.title} who sees adults privately at Calm Restored Wellness in ${site.location.display}. You can call ${site.phone.display}, email ${site.email.address} or send an enquiry through this website.`,
  },
  {
    q: "Can I see a psychiatrist privately in Ghana without a referral?",
    a: "You are welcome to contact the team directly. If you have a doctor or other clinician involved in your care, it can be helpful to bring any letters or medication details, and with your consent Dr Sedohia can work alongside them.",
  },
  {
    q: "I do not live in Accra. Can I still be seen?",
    a: "Many people travel to Accra for an initial assessment. Virtual consultations and home visits may also be possible, depending on your needs, your location and clinical suitability. The team will discuss the options with you before anything is booked.",
  },
  {
    q: "What conditions does private psychiatric care cover?",
    a: "Dr Sedohia assesses and treats a wide range of adult mental health conditions, including depression, anxiety, bipolar disorder, psychosis, adult ADHD, and alcohol and drug use problems. He also offers second opinions and specialist reviews.",
  },
  {
    q: "How quickly can I be seen?",
    a: site.availabilityNote + " Please call or send an enquiry and the team will discuss the options with you.",
  },
];

export default function PrivatePsychiatristGhanaPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "Private psychiatric care in Ghana",
      url: `${site.url}${path}`,
      about: { "@type": "MedicalSpecialty", name: "Psychiatric" },
      audience: { "@type": "PeopleAudience", geographicArea: { "@type": "Country", name: "Ghana" } },
      provider: { "@id": `${site.url}/#practice` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ghanaFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Private psychiatric care in Ghana", item: `${site.url}${path}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Private psychiatric care in Ghana"
        title={<>A private psychiatrist <em className="font-light italic text-gold-light">in Accra, Ghana.</em></>}
        intro={
          <p>
            Confidential, specialist-led psychiatric care with {site.clinician.name}, {site.clinician.title}, at {site.name} in {site.location.display}.
          </p>
        }
        image="consultation"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="#enquiry" className="btn btn-light">Request a Consultation <ArrowRight /></Link>
          <a href={site.phone.href} className="btn btn-outline-light">Call {site.phone.display}</a>
        </div>
      </PageHero>

      <section aria-labelledby="what-heading" className="py-16 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <p className="eyebrow reveal">What private care means</p>
            <h2 id="what-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Specialist mental healthcare, arranged around you.</h2>
            <div className="prose-calm reveal mt-8 text-lg text-stone" style={d(100)}>
              <p>
                Private psychiatric care in Ghana gives you direct access to a specialist, with the time, privacy and continuity that good mental healthcare needs. At {site.name}, every person is seen by {site.clinician.name}, a {site.clinician.title} in {site.clinician.specialisms.toLowerCase()}.
              </p>
              <p>
                Care begins with a thorough assessment and continues with a clear plan agreed with you. Where it helps, and with your permission, family members and other professionals can be involved.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Photo image="clinicOverview" sizes="(min-width:1024px) 45vw, 90vw" className="aspect-[3/2] rounded-2xl" />
          </div>
        </div>
      </section>

      <section aria-labelledby="why-heading" className="bg-ivory-deep py-16 md:py-32">
        <div className="container-site">
          <p className="eyebrow reveal">Why people choose us</p>
          <h2 id="why-heading" className="reveal mt-6 max-w-3xl text-4xl text-plum md:text-5xl">Private, personal and specialist-led.</h2>
          <dl className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([t, b], i) => (
              <div key={t} className="reveal border-t border-gold-light/70 py-8" style={d((i % 4) * 80)}>
                <dt className="font-serif text-2xl text-plum-ink">{t}</dt>
                <dd className="mt-3 text-stone">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="py-16 md:py-32">
        <div className="container-site">
          <p className="eyebrow reveal">Services</p>
          <h2 id="services-heading" className="reveal mt-6 max-w-3xl text-4xl text-plum md:text-5xl">Private psychiatric services in Accra.</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gold-light/50 bg-gold-light/50 sm:grid-cols-2">
            {featured.map((slug, i) => {
              const s = services.find((x) => x.slug === slug);
              if (!s) return null;
              return (
                <li key={slug} className="reveal bg-ivory" style={d((i % 2) * 80)}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full flex-col p-7 transition-colors hover:bg-ivory-deep md:p-9">
                    <h3 className="text-2xl text-plum-ink">{s.title}</h3>
                    <p className="mt-3 flex-1 text-stone">{s.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-plum">Learn more <ArrowRight /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ghana-faq-heading" className="bg-ivory-deep py-16 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow reveal">Questions</p>
            <h2 id="ghana-faq-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Seeing a psychiatrist privately in Ghana.</h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={ghanaFaqs} />
          </div>
        </div>
        <div className="container-site mt-16">
          <p className="reveal rounded-2xl bg-lavender/70 p-7 text-plum-ink md:p-8">
            <strong className="font-medium">In an emergency:</strong> if you or someone else is at immediate risk, go to the nearest emergency department or contact emergency services.
          </p>
        </div>
      </section>

      <ContactSection
        showPhoto={false}
        heading="Speak to a private psychiatrist in Accra."
        intro="Share a brief outline of what you are looking for, and the team will be in touch to discuss your needs and the options available."
      />
    </>
  );
}
