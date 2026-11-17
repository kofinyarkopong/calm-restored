import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import ContactSection from "@/components/ContactSection";
import { ArrowRight, Ornament } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import { images } from "@/config/images";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { site } from "@/content/site";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* A. Photographic hero */}
      <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-aubergine text-ivory lg:min-h-[100svh]">
        {/* Portrait */}
        <div className="hero-image-in relative h-[68svh] min-h-[440px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
          <Image
            src={images.heroPortrait.src!}
            alt={images.heroPortrait.alt}
            fill
            priority
            sizes="(min-width:1024px) 60vw, 100vw"
            quality={82}
            className="object-cover object-[56%_22%] lg:object-[60%_28%] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_30%)]"
          />
          {/* Overlays keep text readable without covering the face */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-aubergine via-aubergine/60 to-transparent lg:hidden" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-aubergine/70 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-aubergine/80 to-transparent lg:block" />
        </div>
        <div aria-hidden className="pointer-events-none absolute -left-48 top-1/3 hidden h-[40rem] w-[40rem] rounded-full bg-plum/45 blur-[140px] lg:block" />

        <div className="container-site relative -mt-28 pb-16 lg:mt-0 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-28 lg:pt-36">
          <div className="max-w-xl xl:max-w-2xl">
            <p className="eyebrow hero-in !text-gold-light" style={d(200)}>{site.descriptor}</p>
            <h1 id="hero-heading" className="hero-in mt-6 text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[5.2rem]" style={d(320)}>
              Private psychiatric care.{" "}
              <em className="block font-light italic text-gold-light">Centred on you.</em>
            </h1>
            <p className="hero-in mt-7 max-w-lg text-lg leading-relaxed text-ivory/85 md:text-xl" style={d(460)}>
              Specialist mental healthcare in Accra, shaped around your needs, with compassion, discretion and respect.
            </p>

            <div className="hero-in mt-9 flex items-center gap-4" style={d(580)}>
              <span aria-hidden className="h-px w-10 bg-gold-light/70" />
              <p className="leading-snug">
                <span className="block font-serif text-xl italic">{site.clinician.name}</span>
                <span className="mt-1 block text-[0.72rem] uppercase tracking-[0.18em] text-ivory/70">
                  {site.clinician.title} <span aria-hidden className="text-gold-light">|</span> {site.clinician.specialisms}
                </span>
              </p>
            </div>

            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={d(700)}>
              <Link href="/contact#enquiry" className="btn btn-light">Request a Consultation <ArrowRight /></Link>
              <Link href="/about" className="btn btn-outline-light">Meet Dr Sedohia</Link>
            </div>

            <p className="hero-in mt-12 text-[0.72rem] uppercase tracking-[0.2em] text-ivory/60" style={d(820)}>
              West Trasacco, Accra <span aria-hidden className="mx-2 text-gold-light">·</span> In-person and virtual consultations
            </p>
          </div>
        </div>
      </section>

      {/* B. A personal welcome */}
      <section aria-labelledby="welcome-heading" className="py-24 md:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6 lg:col-start-1">
            <p className="eyebrow reveal">Welcome</p>
            <h2 id="welcome-heading" className="reveal mt-6 text-4xl text-plum md:text-[3.4rem]">
              Welcome to a different experience of mental healthcare.
            </h2>
            <div className="prose-calm reveal mt-8 max-w-xl text-lg text-stone" style={d(100)}>
              <p>
                Calm Restored is a private mental health service in Accra for people who value specialist expertise, discretion and time. Every consultation is led by a specialist psychiatrist, and every plan is shaped around the individual, their circumstances and what matters most to them.
              </p>
              <p>
                We refer to the people in our care as <em className="font-serif text-plum">Our Royals</em>, a reflection of the respect, dignity and individual attention every person deserves. From the first conversation, you can expect to be listened to carefully, treated with courtesy and supported in comfortable, private surroundings.
              </p>
            </div>
            <Link href="/experience" className="text-link reveal mt-10" style={d(200)}>
              The Calm Restored experience <ArrowRight />
            </Link>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <Photo image="welcome" sizes="(min-width:1024px) 38vw, 90vw" className="aspect-[4/5] rounded-t-[999px]" />
            <div aria-hidden className="absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-t-[999px] border border-gold-light/70" />
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section aria-label="Our promise" className="border-y border-gold-light/50 bg-lavender/60 py-16 md:py-20">
        <div className="container-site text-center">
          <Ornament className="reveal mx-auto h-6 w-28 text-gold" />
          <p className="reveal mx-auto mt-8 max-w-5xl font-serif text-3xl leading-snug text-plum-ink md:text-5xl">
            Exceptional Mental Healthcare. <em className="text-plum">Absolute Discretion.</em> Personalised Recovery.
          </p>
        </div>
      </section>

      {/* C. Meet Dr Albert Sedohia */}
      <section aria-labelledby="meet-heading" className="py-24 md:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <Photo image="meetDoctor" sizes="(min-width:1024px) 40vw, 90vw" className="aspect-[3/4] rounded-sm" />
            <div className="reveal absolute -bottom-8 right-4 max-w-[15rem] bg-plum p-6 text-ivory shadow-xl sm:-right-8" style={d(300)}>
              <p className="font-serif text-5xl leading-none">10+</p>
              <p className="mt-2 text-sm leading-snug text-ivory/80">years of clinical experience in psychiatry</p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow reveal">Meet your psychiatrist</p>
            <h2 id="meet-heading" className="reveal mt-6 text-4xl text-plum md:text-6xl">Dr Albert Sedohia</h2>
            <p className="reveal mt-3 font-serif text-xl italic text-gold">Specialist Psychiatrist</p>
            <div className="prose-calm reveal mt-8 text-lg text-stone" style={d(100)}>
              <p>
                Dr Sedohia is a Specialist Psychiatrist with more than a decade of clinical experience, including work at Korle-Bu Teaching Hospital, Pantang Hospital and Accra Psychiatric Hospital. He brings careful clinical judgement and a calm, respectful manner to every consultation.
              </p>
              <p>
                His practice centres on adult psychiatry and addiction psychiatry, and he is a committed advocate for mental health education and wellbeing in the workplace.
              </p>
            </div>
            <ul className="reveal mt-10 grid gap-x-8 gap-y-3 border-t border-gold-light/60 pt-8 sm:grid-cols-2" style={d(200)}>
              {[
                "Adult psychiatry",
                "Addiction psychiatry",
                "Assessment and diagnosis",
                "Treatment and recovery planning",
                "Multidisciplinary care",
                "Workplace mental health",
              ].map((x) => (
                <li key={x} className="flex items-center gap-3 text-plum-ink">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" /> {x}
                </li>
              ))}
            </ul>
            <Link href="/about" className="text-link reveal mt-10">Read Dr Sedohia&apos;s profile <ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* D. Specialist services */}
      <section aria-labelledby="services-heading" className="bg-ivory-deep py-24 md:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow reveal">Specialist services</p>
              <h2 id="services-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Care for every stage of recovery.</h2>
              <p className="reveal mt-6 text-lg text-stone">
                From a first assessment to long-term support, each service is delivered personally and coordinated around you.
              </p>
              <Link href="/services" className="btn btn-primary reveal mt-10">View all services <ArrowRight /></Link>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {services.map((s, i) => (
              <li key={s.slug} className="reveal border-t border-gold-light/70 last:border-b" style={d((i % 4) * 60)}>
                <Link href={`/services/${s.slug}`} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[4.5rem_1fr_auto] md:py-8">
                  <span className="font-serif text-lg italic text-gold">{s.number}</span>
                  <span>
                    <span className="block font-serif text-2xl text-plum-ink transition-colors group-hover:text-plum md:text-[1.9rem]">{s.title}</span>
                    <span className="mt-2 block max-w-xl text-stone">{s.summary}</span>
                  </span>
                  <span className="grid h-11 w-11 place-items-center self-center rounded-full border border-gold-light text-plum transition-all duration-500 group-hover:border-plum group-hover:bg-plum group-hover:text-ivory">
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* E. The Calm Restored experience */}
      <section aria-labelledby="experience-heading" className="relative overflow-hidden bg-aubergine py-24 text-ivory md:py-36">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-plum/40 blur-[140px]" />
        <div className="container-site relative grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Photo image="philosophy" sizes="(min-width:1024px) 38vw, 90vw" className="aspect-[4/5] rounded-b-[999px]" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow reveal !text-gold-light">The Calm Restored experience</p>
            <h2 id="experience-heading" className="reveal mt-6 text-4xl md:text-[3.4rem]">
              Your privacy. Your dignity. <em className="text-gold-light">Our priority.</em>
            </h2>
            <p className="reveal mt-6 max-w-xl text-lg text-ivory/80">
              Seeking help takes courage. We want every part of your care, from the first telephone call to ongoing support, to feel calm, considered and respectful.
            </p>
            <div className="mt-12 space-y-10">
              {[
                ["I", "Comfort", "Unhurried appointments in a calm, private setting, with flexibility to meet in person, virtually or, where suitable, at home."],
                ["II", "Dignity", "You are treated as an individual, never as a diagnosis. Your views shape your care, and your information is handled with discretion."],
                ["III", "Specialist expertise", "Assessment and treatment are led by a specialist psychiatrist, drawing on more than a decade of clinical experience."],
              ].map(([n, t, body], i) => (
                <div key={t} className="reveal grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ivory/15 pt-8" style={d(i * 120)}>
                  <span className="font-serif text-2xl italic text-gold-light">{n}</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl">{t}</h3>
                    <p className="mt-3 text-ivory/75">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/experience" className="btn btn-outline-light reveal mt-12">Discover the experience <ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* F. Stress management and wellbeing */}
      <section aria-labelledby="calm-heading" className="surface-grain overflow-hidden bg-[linear-gradient(160deg,#f3eadc_0%,#efe8f4_100%)] py-24 md:py-36">
        <div className="container-site relative grid items-center gap-14 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <p className="eyebrow reveal">Stress management and wellbeing</p>
            <h2 id="calm-heading" className="reveal mt-6 text-5xl text-plum md:text-7xl">Make room for calm.</h2>
            <div className="prose-calm reveal mt-8 max-w-xl text-lg text-stone" style={d(100)}>
              <p>
                Persistent stress can quietly affect sleep, mood, concentration and relationships. Our personalised stress management programme begins with understanding what is driving it, then builds practical, evidence-based ways of easing it.
              </p>
              <p>
                Plans may include relaxation techniques and, where clinically appropriate, supervised nature-based activities. These complement, rather than replace, psychiatric care, and every element is chosen for you as an individual.
              </p>
            </div>
            <ul className="reveal mt-8 flex flex-wrap gap-2.5" style={d(200)}>
              {["Stress assessment", "Coping strategies", "Relaxation techniques", "Ecotherapy"].map((x) => (
                <li key={x} className="rounded-full border border-plum/25 px-4 py-1.5 text-sm text-plum-ink">{x}</li>
              ))}
            </ul>
            <Link href="/services/stress-management-ecotherapy" className="btn btn-primary reveal mt-10">Explore Stress Management <ArrowRight /></Link>
          </div>
          <div className="order-1 grid grid-cols-5 gap-4 lg:order-2 lg:col-span-6">
            <Photo image="ecotherapy" sizes="(min-width:1024px) 30vw, 55vw" className="col-span-3 aspect-[3/4] rounded-t-[999px]" />
            <Photo image="premisesGarden" sizes="(min-width:1024px) 20vw, 40vw" className="col-span-2 mt-16 aspect-[3/5] rounded-b-[999px]" delay={200} />
          </div>
        </div>
      </section>

      {/* G. What happens next */}
      <section aria-labelledby="next-heading" className="py-24 md:py-36">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow reveal">What happens next</p>
              <h2 id="next-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">A simple, private first step.</h2>
            </div>
            <p className="reveal text-lg text-stone lg:col-span-5 lg:col-start-8 lg:self-end">
              Getting in touch places you under no obligation. Treatment begins only after an assessment and a plan you have agreed with your clinician.
            </p>
          </div>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gold-light/70 lg:block" />
            {[
              ["Contact the team", "Call us or send a brief enquiry with your preferred contact details."],
              ["Discuss your needs", "We talk through what you are looking for and the consultation options that may suit you."],
              ["Initial assessment", "Meet Dr Sedohia for a thorough, unhurried specialist assessment."],
              ["Your personalised plan", "Agree a care plan together, with clear next steps and regular review."],
            ].map(([t, body], i) => (
              <li key={t} className="reveal relative" style={d(i * 120)}>
                <span className="relative grid h-14 w-14 place-items-center rounded-full border border-gold-light bg-ivory font-serif text-xl italic text-plum">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-2xl text-plum-ink">{t}</h3>
                <p className="mt-3 text-stone">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* H. Workplace mental health */}
      <section aria-labelledby="workplace-heading" className="pb-24 md:pb-36">
        <div className="container-site">
          <div className="grid overflow-hidden rounded-3xl bg-plum text-ivory lg:grid-cols-2">
            <Photo image="workplace" sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[3/2] lg:aspect-auto lg:min-h-[30rem]" />
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="eyebrow reveal !text-gold-light">For organisations</p>
              <h2 id="workplace-heading" className="reveal mt-6 text-4xl md:text-5xl">Workplace mental health</h2>
              <p className="reveal mt-6 text-lg text-ivory/80">
                Support your people with specialist expertise. Calm Restored works with employers on Employee Assistance Programmes, screening, education, burnout support and mental health policy, with confidentiality respected throughout.
              </p>
              <Link href="/workplace" className="btn btn-light reveal mt-10">Workplace services <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* I. Frequently asked questions */}
      <section aria-labelledby="faq-heading" className="border-t border-gold-light/50 py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow reveal">Questions</p>
            <h2 id="faq-heading" className="reveal mt-6 text-4xl text-plum md:text-5xl">Frequently asked questions</h2>
            <p className="reveal mt-6 text-stone">
              If your question is not answered here, please call <a href={site.phone.href} className="text-plum underline underline-offset-2">{site.phone.display}</a>.
            </p>
          </div>
          <div className="reveal lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* J. Closing invitation and contact */}
      <ContactSection />
    </>
  );
}
