import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { ArrowRight } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "The Calm Restored Experience",
  description:
    "Personalised, specialist-led psychiatric care built on dignity, informed consent, shared decisions, confidentiality and continuity of care.",
  alternates: { canonical: "/experience" },
};

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const principles = [
  {
    t: "Personalised, specialist-led care",
    b: "Your care is led by a specialist psychiatrist from the first assessment onwards. Plans are built around your history, your circumstances and what you want to achieve, rather than a standard template.",
  },
  {
    t: "A calm and comfortable experience",
    b: "Appointments are unhurried and held in private, comfortable surroundings. Where it suits you and is clinically appropriate, consultations can also take place virtually or at home.",
  },
  {
    t: "Autonomy and informed consent",
    b: "You will receive clear explanations of your assessment, the options available and their likely benefits and risks, so that you can make decisions that are right for you.",
  },
  {
    t: "Shared decision-making",
    b: "Treatment is something we plan together. Your preferences, values and questions are part of every decision, and plans are reviewed with you as your needs change.",
  },
  {
    t: "Confidential handling of information",
    b: "Personal and clinical information is handled with discretion and shared only with your consent, except where professional duties or the law require otherwise, for example where there is a serious risk to safety. These limits will always be explained to you.",
  },
  {
    t: "Family involvement, with your agreement",
    b: "Relatives and trusted people can be involved in your care where this is appropriate and you have authorised it. You decide who is involved and what is shared.",
  },
  {
    t: "Continuity of care",
    b: "Seeing the same specialist over time allows a deeper understanding of your needs. Where other professionals are involved, care is coordinated so that it remains joined up.",
  },
  {
    t: "A rights-based, non-discriminatory approach",
    b: "Everyone is treated with equal respect, whatever their background, beliefs, circumstances or diagnosis. Your rights are respected at every stage of care.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="The Calm Restored experience"
        title={<>Your privacy. Your dignity. <em className="font-light italic text-gold-light">Our priority.</em></>}
        intro={<p>What it means to be cared for by Calm Restored: specialist expertise, delivered with courtesy, discretion and genuine respect for the person in front of us.</p>}
        image="philosophy"
      />

      <section aria-labelledby="exp-intro" className="py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <h2 id="exp-intro" className="reveal text-4xl text-plum md:text-5xl lg:col-span-5">Care that begins with listening.</h2>
          <div className="prose-calm reveal text-lg text-stone lg:col-span-6 lg:col-start-7" style={d(100)}>
            <p>
              Reaching out about your mental health, or about someone you love, can feel daunting. We aim to make each step feel calm and manageable, with clear information and no pressure.
            </p>
            <p>
              The principles below describe how we work. They shape every consultation, every plan and every conversation with the people in our care, whom we call <em className="font-serif text-plum">Our Royals</em>.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Our principles" className="pb-24 md:pb-32">
        <div className="container-site">
          <ol className="grid border-t border-gold-light/70 md:grid-cols-2">
            {principles.map((p, i) => (
              <li
                key={p.t}
                className={`reveal border-b border-gold-light/70 py-10 md:px-10 ${i % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0"}`}
                style={d((i % 2) * 100)}
              >
                <span className="font-serif text-lg italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.75rem] text-plum-ink">{p.t}</h3>
                <p className="mt-3 text-stone">{p.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Our setting: genuine premises photographs to be supplied */}
      <section aria-labelledby="setting-heading" className="bg-ivory-deep py-24 md:py-32">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow reveal">Our setting</p>
              <h2 id="setting-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">A quiet place in West Trasacco.</h2>
            </div>
            <p className="reveal text-lg text-stone lg:col-span-5 lg:col-start-8 lg:self-end">
              Consultations take place in a private setting in West Trasacco, Accra, designed to feel calm and welcoming. The full address is shared when your appointment is arranged.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
            <Photo image="welcome" sizes="(min-width:768px) 33vw, 50vw" className="col-span-1 aspect-[3/4] md:col-span-4" />
            <Photo image="premisesReception" sizes="(min-width:768px) 42vw, 50vw" className="col-span-1 aspect-[3/4] md:col-span-5 md:aspect-auto" delay={120} />
            <Photo image="premisesLounge" sizes="(min-width:768px) 25vw, 100vw" className="col-span-2 aspect-[16/9] md:col-span-3 md:aspect-[3/4] md:mt-16" delay={240} />
          </div>
        </div>
      </section>

      <section aria-label="Explore" className="py-24 md:py-28">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <Link href="/about" className="reveal group rounded-3xl bg-plum p-10 text-ivory md:p-12">
            <span className="eyebrow !text-gold-light">Your psychiatrist</span>
            <span className="mt-5 block font-serif text-3xl md:text-4xl">Meet Dr Albert Sedohia</span>
            <span className="mt-8 inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em] text-gold-light">Read profile <ArrowRight /></span>
          </Link>
          <Link href="/services" className="reveal group rounded-3xl bg-lavender p-10 text-plum-ink md:p-12" style={d(120)}>
            <span className="eyebrow">How we can help</span>
            <span className="mt-5 block font-serif text-3xl md:text-4xl">Explore our services</span>
            <span className="mt-8 inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em] text-plum">View services <ArrowRight /></span>
          </Link>
        </div>
      </section>

      <ContactSection showPhoto={false} />
    </>
  );
}
