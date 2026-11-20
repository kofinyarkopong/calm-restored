import type { Service } from "@/content/services";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileActionBar from "@/components/MobileActionBar";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/content/site";
import { getServices, getSettings, type Settings } from "@/lib/cms";

const orgSchema = (settings: Settings, services: Service[]) => ({
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalBusiness"],
  "@id": `${site.url}/#practice`,
  name: site.name,
  description: site.descriptor,
  url: site.url,
  logo: `${site.url}/images/brand/logo-full.png`,
  image: `${site.url}/og-image-wellness.jpg`,
  telephone: settings.phone.e164,
  email: settings.email.address,
  medicalSpecialty: "Psychiatric",
  address: {
    "@type": "PostalAddress",
    addressLocality: `${site.location.area}, ${site.location.city}`,
    addressRegion: "Greater Accra",
    addressCountry: site.location.countryCode,
  },
  areaServed: { "@type": "Country", name: "Ghana" },
  founder: { "@id": `${site.url}/#physician` },
  employee: {
    "@type": "Physician",
    "@id": `${site.url}/#physician`,
    name: site.clinician.name,
    medicalSpecialty: "Psychiatric",
    url: `${site.url}/about`,
  },
  knowsAbout: [
    "Private psychiatric care",
    "Adult psychiatry",
    "Addiction psychiatry",
    "Adult ADHD assessment",
    "Depression",
    "Anxiety disorders",
    "Bipolar disorder",
    "Alcohol and drug addiction",
  ],
  availableService: services.map((s) => ({
    "@type": "MedicalTherapy",
    name: s.title,
    description: s.summary,
    url: `${site.url}/services/${s.slug}`,
  })),
});

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  return (
    <>
      <JsonLd data={orgSchema(settings, services)} />
      <div className="scroll-progress" aria-hidden />
      <Header phone={settings.phone} location={settings.location.display} />
      <main id="main">{children}</main>
      <Footer />
      <MobileActionBar phoneHref={settings.phone.href} />
      <RevealObserver />
    </>
  );
}
