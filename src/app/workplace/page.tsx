import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import { ArrowRight } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workplace Mental Health",
  description:
    "Workplace mental health consultancy in Accra: Employee Assistance Programmes, screening, psychiatric consultations, education, burnout support, crisis intervention and policy development.",
  alternates: { canonical: "/workplace" },
};

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const offers = [
  ["Employee Assistance Programmes", "Confidential access to specialist mental health support for your employees."],
  ["Workplace screening", "Structured mental health screening to help identify needs early."],
  ["Psychiatric consultations", "Specialist assessment and treatment for employees who need it."],
  ["Counselling support", "Access to supportive conversations for employees facing difficulties."],
  ["Mental health education", "Talks and training for staff, managers and leadership teams."],
  ["Stress and burnout support", "Practical help to recognise, prevent and respond to burnout."],
  ["Crisis intervention", "Specialist guidance when a workplace mental health crisis occurs."],
  ["Policy development", "Support in shaping clear, humane organisational mental health policies."],
];

export default function WorkplacePage() {
  return (
    <>
      <PageHero
        eyebrow="Workplace mental health"
        title={<>Healthier people. <em className="font-light italic text-gold-light">Stronger organisations.</em></>}
        intro={<p>Specialist mental health consultancy for employers who want to support their people with expertise, discretion and care.</p>}
      >
        <Link href="#enquiry" className="btn btn-light">Discuss your organisation <ArrowRight /></Link>
      </PageHero>

      <section aria-labelledby="why-heading" className="py-16 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <p className="eyebrow reveal">Why it matters</p>
            <h2 id="why-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Wellbeing is part of how good work gets done.</h2>
            <div className="prose-calm reveal mt-8 text-lg text-stone" style={d(100)}>
              <p>
                Stress, anxiety, depression and substance use affect people in every kind of workplace. When they go unrecognised, they can affect health, relationships, performance and retention.
              </p>
              <p>
                Calm Restored helps organisations respond with confidence. Led by Dr Albert Sedohia, Specialist Psychiatrist, our workplace services combine clinical expertise with a practical understanding of how organisations work.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Photo image="workplace" sizes="(min-width:1024px) 45vw, 90vw" className="aspect-[3/2] rounded-2xl" />
          </div>
        </div>
      </section>

      <section aria-labelledby="offer-heading" className="bg-ivory-deep py-16 md:py-32">
        <div className="container-site">
          <p className="eyebrow reveal">What we offer</p>
          <h2 id="offer-heading" className="reveal mt-6 max-w-3xl text-4xl text-plum md:text-5xl">Support shaped around your organisation.</h2>
          <dl className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map(([t, b], i) => (
              <div key={t} className="reveal border-t border-gold-light/70 py-8" style={d((i % 4) * 80)}>
                <dt className="font-serif text-2xl text-plum-ink">{t}</dt>
                <dd className="mt-3 text-stone">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="py-16 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow reveal">How we work together</p>
            <h2 id="how-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">A considered, confidential approach.</h2>
          </div>
          <ol className="space-y-8 lg:col-span-6 lg:col-start-7">
            {[
              ["An initial conversation", "We learn about your organisation, your people and what you hope to achieve."],
              ["A proposal for your needs", "We recommend a combination of services suited to your size, sector and priorities."],
              ["Delivery and review", "Services are delivered with care, and we review progress with you over time."],
            ].map(([t, b], i) => (
              <li key={t} className="reveal grid grid-cols-[3.5rem_1fr] gap-4" style={d(i * 100)}>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-light font-serif italic text-plum">{i + 1}</span>
                <div>
                  <h3 className="text-2xl text-plum-ink">{t}</h3>
                  <p className="mt-2 text-stone">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="container-site mt-16">
          <p className="reveal rounded-2xl bg-lavender/70 p-7 text-plum-ink md:p-8">
            <strong className="font-medium">Confidentiality for employees.</strong> Individual consultations remain confidential. Information is shared with an employer only with the employee&apos;s consent, or where professional or legal obligations require it, and these limits are explained to employees in advance.
          </p>
        </div>
      </section>

      <ContactSection
        showPhoto={false}
        defaultService="Workplace Mental Health Consultancy"
        heading="Let us talk about your organisation."
        intro="Share a brief outline of your organisation and what you are looking for, and the team will be in touch to arrange a conversation."
      />
    </>
  );
}
