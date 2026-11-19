import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileActionBar from "@/components/MobileActionBar";
import RevealObserver from "@/components/RevealObserver";
import { services } from "@/content/services";
import { site } from "@/content/site";

// Self-hosted fonts (SIL Open Font Licence): Fraunces for headings, Jost for text
const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-opsz-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/fraunces-latin-opsz-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});
const jost = localFont({
  src: [{ path: "../fonts/jost-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-jost",
  display: "swap",
});

const description =
  "Private psychiatric care in Accra, Ghana, led by Dr Albert Sedohia, Specialist Psychiatrist in adult and addiction psychiatry. Confidential assessment and treatment, ADHD assessment, home visits and virtual consultations.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Private Psychiatrist in Accra, Ghana | Calm Restored Wellness",
    template: "%s | Calm Restored Wellness",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "Calm Restored Wellness | Private Psychiatric Care in Accra, Ghana",
    description,
    images: [{ url: "/og-image-wellness.jpg", width: 1200, height: 630, alt: "Calm Restored Wellness, Private Concierge Mental Health Services, with Dr Albert Sedohia" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image-wellness.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#220a31" };

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalBusiness"],
  "@id": `${site.url}/#practice`,
  name: site.name,
  description: site.descriptor,
  url: site.url,
  logo: `${site.url}/images/brand/logo-full.png`,
  image: `${site.url}/og-image-wellness.jpg`,
  telephone: site.phone.e164,
  email: site.email.address,
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={orgSchema} />
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <RevealObserver />
      </body>
    </html>
  );
}
