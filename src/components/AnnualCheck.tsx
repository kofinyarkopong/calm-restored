import Link from "next/link";
import CountUp from "./CountUp";
import { ArrowRight } from "./Icons";

/**
 * Annual mental health check: the campaign content for the Workplace page.
 * Figures are from WHO, the WHO/World Bank study in The Lancet Psychiatry and Eurostat (EU labour force survey),
 * each linked in the source lines below.
 */

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
    <path d="M5 12.5 10 17.5 19 7" />
  </svg>
);

const stats = [
  { value: <><CountUp to={15} />%</>, label: "of working-age adults live with a mental disorder" },
  { value: <><CountUp to={12} /> bn</>, label: "working days lost every year to depression and anxiety" },
  { value: <>US$1 tn</>, label: "lost to the global economy each year in productivity" },
  { value: <>US$4</>, label: "returned for every US$1 invested in treating depression and anxiety" },
];

const risks = [
  ["Excessive workload", "Too much to do, and too little time to do it."],
  ["Long or unsocial hours", "Little room to rest, recover or switch off."],
  ["Low job control", "No say in how the work gets done."],
  ["Job insecurity", "Constant worry about losing your income."],
  ["Bullying and harassment", "Including sexual harassment, intimidation and psychological abuse."],
  ["Discrimination and exclusion", "Being treated as though you do not belong."],
  ["Unclear roles, poor communication", "Conflicting demands and mixed messages."],
  ["Lack of support", "Little help from managers or colleagues."],
];

const reasons = [
  ["It is normal.", "You already check your blood pressure. Your mind deserves the same care."],
  ["It catches things early.", "Noticing stress or low mood sooner makes support easier to find."],
  ["It is confidential.", "A private conversation with a specialist, not a conversation in the corridor."],
  ["It is a check, not a label.", "A screening is a first look at how you are doing. It is not a diagnosis."],
  ["You are not alone.", "More than one billion people worldwide live with a mental health condition."],
];

const signs = [
  "Often feel overwhelmed, stressed or anxious",
  "Have a persistent low mood, loss of interest or lack of motivation",
  "Have ongoing sleep problems, sleeping too little or too much",
  "Notice a decline in your energy, focus or performance at work",
  "Find yourself withdrawing from family, friends or usual activities",
  "Feel more irritable or angry, or find your emotions hard to manage",
  "Are using alcohol, drugs, gambling or other behaviours to cope",
];

const myths = [
  ["It is weakness.", "It is health. The brain can become unwell, just like the body."],
  ["It will never be me.", "Anyone can be affected, including people who seem strong."],
  ["Keep quiet about it.", "Speak early. Support and treatment help people recover and thrive."],
];

const src = "text-[0.8rem] leading-relaxed";
const srcLink = "underline decoration-current/40 underline-offset-2 hover:decoration-current";

export default function AnnualCheck() {
  return (
    <>
      {/* 1. The question */}
      <section id="annual-check" aria-labelledby="annual-heading" className="relative scroll-mt-24 overflow-hidden bg-aubergine py-20 text-ivory md:py-32">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-plum/40 blur-[120px] glow-drift" />
        <div className="container-site relative grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <p className="eyebrow reveal !text-gold-light">Annual mental health check</p>
            <h2 id="annual-heading" className="reveal mt-6 text-4xl leading-[1.08] md:text-6xl">
              We check the body every year. <em className="font-light italic text-gold-light">Who checks the mind?</em>
            </h2>
            <div className="prose-calm reveal mt-8 text-lg text-ivory/80" style={d(100)}>
              <p>
                Mental health is health. A confidential annual mental health check is a simple, professional look at your emotional, psychological and behavioural wellbeing, with Dr Albert Sedohia, Specialist Psychiatrist.
              </p>
              <p>It is available to individuals, and to organisations that want to offer it to their teams.</p>
            </div>
            <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row" style={d(200)}>
              <Link href="#enquiry" className="btn btn-light">Book a confidential check <ArrowRight /></Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="sr-only">An annual check-up usually covers blood pressure, cholesterol and blood sugar, but often leaves out mental health.</p>
            <ul aria-hidden className="space-y-4">
              {["Blood pressure", "Cholesterol and blood sugar"].map((item, i) => (
                <li key={item} className="reveal flex items-center justify-between rounded-2xl border border-ivory/25 px-6 py-5 text-lg md:text-xl" style={d(i * 120)}>
                  {item}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory/10 text-gold-light"><Tick /></span>
                </li>
              ))}
              <li className="reveal flex items-center justify-between rounded-2xl bg-gold-light px-6 py-5 text-lg font-medium text-aubergine shadow-[0_20px_60px_-20px_rgba(212,183,124,0.6)] md:text-xl" style={d(260)}>
                Mental health
                <span className="check-pulse grid h-9 w-9 place-items-center rounded-full bg-aubergine font-serif text-xl italic text-gold-light">?</span>
              </li>
            </ul>
            <p className="reveal mt-6 font-serif text-2xl italic text-gold-light" style={d(380)}>Your mind deserves a check-up too.</p>
          </div>
        </div>
      </section>

      {/* 2. Why it matters at work */}
      <section aria-labelledby="impact-heading" className="py-16 md:py-32">
        <div className="container-site">
          <p className="eyebrow reveal">Why it matters at work</p>
          <h2 id="impact-heading" className="reveal mt-6 max-w-3xl text-4xl text-plum md:text-5xl">Common, costly and treatable.</h2>
          <dl className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`reveal flex flex-col rounded-2xl p-7 md:p-8 ${i === 3 ? "bg-plum text-ivory" : "border border-gold-light/60 bg-ivory"}`}
                style={d(i * 90)}
              >
                <dt className={`order-2 mt-4 text-[1.02rem] leading-snug ${i === 3 ? "text-ivory/85" : "text-stone"}`}>{s.label}</dt>
                <dd className={`order-1 font-serif text-5xl leading-none md:text-6xl ${i === 3 ? "text-gold-light" : "text-plum"}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="reveal mt-8 max-w-3xl text-lg text-stone">
            In the first year of the COVID-19 pandemic, anxiety and depression rose by 25% worldwide. That is why a regular check matters: noticing early makes support easier, for the person and for the organisation.
          </p>
          <p className={`reveal mt-6 text-stone/80 ${src}`}>
            Sources: World Health Organization,{" "}
            <a className={srcLink} href="https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work" target="_blank" rel="noopener noreferrer">Mental health at work</a>;{" "}
            <a className={srcLink} href="https://www.who.int/news/item/13-04-2016-investing-in-treatment-for-depression-and-anxiety-leads-to-fourfold-return" target="_blank" rel="noopener noreferrer">WHO and World Bank, The Lancet Psychiatry (2016)</a>;{" "}
            <a className={srcLink} href="https://www.who.int/news/item/02-03-2022-covid-19-pandemic-triggers-25-increase-in-prevalence-of-anxiety-and-depression-worldwide" target="_blank" rel="noopener noreferrer">WHO scientific brief (2022)</a>.
          </p>
        </div>
      </section>

      {/* 3. Risks at work */}
      <section aria-labelledby="risks-heading" className="bg-ivory-deep py-16 md:py-32">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow reveal">Know the risks</p>
              <h2 id="risks-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Eight things at work that can affect your mind.</h2>
            </div>
            <p className="reveal text-lg text-stone lg:col-span-4 lg:col-start-9 lg:self-end" style={d(100)}>
              Recognised by the World Health Organization as risks to mental health at work. Spotting them early is the first step to addressing them.
            </p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-gold-light/60 bg-gold-light/60 sm:grid-cols-2 lg:grid-cols-4">
            {risks.map(([t, b], i) => (
              <li key={t} className="reveal bg-ivory p-7 md:p-8" style={d((i % 4) * 80)}>
                <span className="font-serif text-lg italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl leading-snug text-plum-ink">{t}</h3>
                <p className="mt-2 text-stone">{b}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-8 grid items-center gap-4 rounded-2xl bg-plum p-7 text-ivory sm:grid-cols-[auto_1fr] sm:gap-8 md:p-8">
            <p className="font-serif text-5xl leading-none text-gold-light md:text-6xl">45%</p>
            <p className="text-lg text-ivory/90">
              Nearly 45% of workers in the European Union report exposure to risk factors that can harm their mental wellbeing.{" "}
              <span className={`block mt-2 text-ivory/60 ${src}`}>
                Source:{" "}
                <a className={srcLink} href="https://ec.europa.eu/eurostat/statistics-explained/index.php/Self-reported_work-related_health_problems_and_risk_factors_-_key_statistics" target="_blank" rel="noopener noreferrer">Eurostat, EU labour force survey (2020)</a>.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 4. Five reasons, and when to come sooner */}
      <section aria-labelledby="reasons-heading" className="py-16 md:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <p className="eyebrow reveal">Say yes to your check</p>
            <h2 id="reasons-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Five reasons to take your annual check.</h2>
            <ol className="mt-10 space-y-7">
              {reasons.map(([t, b], i) => (
                <li key={t} className="reveal grid grid-cols-[3.5rem_1fr] gap-4" style={d(i * 80)}>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-light font-serif italic text-plum">{i + 1}</span>
                  <div>
                    <h3 className="text-2xl text-plum-ink">{t}</h3>
                    <p className="mt-1 text-stone">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <div className="reveal rounded-3xl bg-[linear-gradient(160deg,#f3eadc_0%,#efe8f4_100%)] p-8 md:p-10" style={d(120)}>
              <p className="eyebrow">When to consider a check</p>
              <h3 className="mt-5 text-3xl text-plum md:text-4xl">Not only for when things are serious.</h3>
              <p className="mt-4 text-stone">A check can help you stay balanced, build resilience and protect your wellbeing. It is especially worth booking if you:</p>
              <ul className="mt-6 space-y-3">
                {signs.map((s) => (
                  <li key={s} className="flex gap-3 text-plum-ink">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-8 rounded-2xl border border-plum/20 bg-ivory/70 p-5 text-plum-ink" role="note">
                <strong className="font-medium">Please do not wait for a routine check</strong> if you are having thoughts of self-harm or feel that life is not worth living. Call the team on the number below, or if you are at immediate risk, go to the nearest emergency department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stigma */}
      <section aria-labelledby="stigma-heading" className="border-t border-gold-light/50 bg-ivory-deep py-16 md:py-32">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow reveal">Stop the stigma</p>
              <h2 id="stigma-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">
                If you have a brain, you can have a <em className="font-light italic">mental health condition.</em>
              </h2>
            </div>
            <p className="reveal text-lg text-stone lg:col-span-4 lg:col-start-9 lg:self-end" style={d(100)}>
              Mental illness does not choose by age, job, status or strength. Nothing makes anyone immune.
            </p>
          </div>
          <dl className="mt-14 space-y-4">
            {myths.map(([myth, fact], i) => (
              <div key={myth} className="reveal grid gap-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-4" style={d(i * 100)}>
                <dt className="flex items-center rounded-2xl border border-plum/20 px-6 py-5 text-lg text-stone">
                  <span className="sr-only">Myth: </span>
                  <s className="decoration-plum/50">&ldquo;{myth}&rdquo;</s>
                </dt>
                <dd className="flex items-center rounded-2xl bg-plum px-6 py-5 text-lg text-ivory">
                  <span className="sr-only">Fact: </span>
                  {fact}
                </dd>
              </div>
            ))}
          </dl>
          <div className="reveal mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-serif text-3xl text-plum-ink md:text-4xl">Check in. Speak up. <em className="italic text-plum">Be kind.</em></p>
            <Link href="#enquiry" className="btn btn-primary shrink-0">Book a confidential check <ArrowRight /></Link>
          </div>
          <p className={`reveal mt-8 text-stone/80 ${src}`}>
            More than one billion people live with a mental health condition:{" "}
            <a className={srcLink} href="https://www.who.int/publications/i/item/9789240113817" target="_blank" rel="noopener noreferrer">World Health Organization, World mental health today (September 2025)</a>.
          </p>
        </div>
      </section>
    </>
  );
}
