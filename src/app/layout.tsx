import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
