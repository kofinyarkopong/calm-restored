import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import { ArrowRight } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import BreathingGuide from "@/components/BreathingGuide";
import GardenVideo from "@/components/GardenVideo";
import Photo from "@/components/Photo";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: s.title, description: s.summary, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: Params) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const idx = services.indexOf(service);
  const next = services[(idx + 1) % services.length];
  const isUrgent = service.slug === "urgent-psychiatric-care";

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: service.title,
    description: service.summary,
    url: `${site.url}/services/${service.slug}`,
    about: { "@type": "MedicalSpecialty", name: "Psychiatric" },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow={`Service ${service.number}`}
        title={service.title}
        intro={<p>{service.intro}</p>}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {isUrgent ? (
            <a href={site.phone.href} className="btn btn-light">Call {site.phone.display}</a>
          ) : (
            <Link href="#enquiry" className="btn btn-light">Request a Consultation <ArrowRight /></Link>
          )}
          <Link href="/services" className="btn btn-outline-light">All services</Link>
        </div>
      </PageHero>

      {isUrgent && service.note && (
        <div className="border-b border-plum/15 bg-lavender">
          <div className="container-site py-6 text-plum-ink" role="note">
            <strong className="font-medium">{service.note.heading}.</strong> {service.note.text}
          </div>
        </div>
      )}

      <section className="py-16 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h2 className="reveal text-3xl text-plum md:text-4xl">{service.coversHeading}</h2>
            <ul className="reveal mt-8 border-t border-gold-light/70">
              {service.covers.map((c) => (
                <li key={c} className="flex gap-4 border-b border-gold-light/70 py-4 text-lg text-plum-ink">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="prose-calm reveal mt-12 text-lg text-stone">
              {service.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            {service.slug === "stress-management-ecotherapy" && (
              <div className="reveal mt-12">
                <BreathingGuide />
              </div>
            )}
            {service.note && !isUrgent && (
              <aside className="reveal mt-12 rounded-2xl border-l-4 border-gold bg-ivory-deep p-7 md:p-8">
                <h3 className="font-serif text-2xl text-plum">{service.note.heading}</h3>
                <p className="mt-3 text-stone">{service.note.text}</p>
              </aside>
            )}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              {service.image && <Photo image={service.image} sizes="(min-width:1024px) 30vw, 90vw" className="aspect-[4/5] rounded-t-[999px]" />}
              <div className="reveal mt-8 rounded-2xl bg-plum p-7 text-ivory">
                <p className="font-serif text-xl leading-snug">{site.availabilityNote}</p>
                <a href={site.phone.href} className="mt-6 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-gold-light">
                  Call {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(service.gallery?.length || service.showGardenVideo) && (
        <section aria-labelledby="setting-gallery" className="bg-ivory-deep py-16 md:py-28">
          <div className="container-site">
            <p className="eyebrow reveal">{service.galleryEyebrow ?? "Our setting"}</p>
            <h2 id="setting-gallery" className="reveal mt-5 max-w-2xl text-3xl text-plum md:text-5xl">{service.galleryHeading}</h2>
            <p className="reveal mt-5 max-w-2xl text-lg text-stone">
              {service.galleryIntro}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-12 md:gap-6">
              {service.showGardenVideo && <GardenVideo className="col-span-2 mx-auto w-full max-w-[22rem] md:col-span-4 md:row-span-2 md:max-w-none" />}
              {service.gallery?.map((g, i) => (
                <Photo
                  key={g}
                  image={g}
                  sizes="(min-width:768px) 32vw, 50vw"
                  delay={i * 100}
                  className={`aspect-square rounded-2xl ${service.showGardenVideo ? "md:col-span-4" : "md:col-span-6"} md:aspect-[4/3]`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-label="Next service" className="border-t border-gold-light/50">
        <Link href={`/services/${next.slug}`} className="group container-site flex items-center justify-between gap-6 py-12 md:py-16">
          <span>
            <span className="eyebrow">Next service</span>
            <span className="mt-3 block font-serif text-3xl text-plum-ink transition-colors group-hover:text-plum md:text-5xl">{next.title}</span>
          </span>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-light text-plum transition-all duration-500 group-hover:bg-plum group-hover:text-ivory">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>
      </section>

      <ContactSection showPhoto={false} defaultService={service.title} heading="Enquire about this service." />
    </>
  );
}
