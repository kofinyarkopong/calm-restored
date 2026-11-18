import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileActionBar from "@/components/MobileActionBar";
import RevealObserver from "@/components/RevealObserver";
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
  "Private concierge psychiatric care in Accra, led by Dr Albert Sedohia, Specialist Psychiatrist in adult and addiction psychiatry. Discreet, personalised and specialist-led.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Calm Restored | Private Concierge Psychiatry in Accra",
    template: "%s | Calm Restored",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "Calm Restored | Private Concierge Mental Health Services",
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Calm Restored, Private Concierge Mental Health Services, with Dr Albert Sedohia" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#220a31" };

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${site.url}/#practice`,
  name: site.name,
  description: site.descriptor,
  url: site.url,
  logo: `${site.url}/images/brand/logo-full.png`,
  image: `${site.url}/og-image.jpg`,
  telephone: site.phone.e164,
  email: site.email.address,
  medicalSpecialty: "Psychiatric",
  address: {
    "@type": "PostalAddress",
    addressLocality: `${site.location.area}, ${site.location.city}`,
    addressCountry: site.location.countryCode,
  },
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
