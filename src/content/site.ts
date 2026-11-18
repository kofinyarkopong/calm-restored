/**
 * Core facts about Calm Restored.
 * Edit here and the change flows through the header, footer, contact panels,
 * structured data and metadata.
 */
export const site = {
  name: "Calm Restored",
  descriptor: "Private Concierge Mental Health Services",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://calmrestoredgh.vercel.app",
  brandMessage: "Exceptional Mental Healthcare. Absolute Discretion. Personalised Recovery.",
  supportingLine: "Your Wellbeing. Your Privacy. Your Recovery.",
  clinician: {
    name: "Dr Albert Sedohia",
    title: "Specialist Psychiatrist",
    specialisms: "Adult Psychiatry & Addiction Psychiatry",
  },
  email: {
    address: "support@calmrestoredwellness.com",
    href: "mailto:support@calmrestoredwellness.com",
  },
  location: {
    area: "West Trasacco",
    city: "Accra",
    country: "Ghana",
    countryCode: "GH",
    display: "West Trasacco, Accra, Ghana",
  },
  phone: {
    display: "+233 24 276 0157",
    href: "tel:+233242760157",
    e164: "+233242760157",
  },
  availabilityNote:
    "Same-day and same-week appointments may be available, subject to availability and clinical suitability.",
  emergencyNote:
    "This form is for appointment enquiries and is not monitored continuously. For an immediate emergency, seek urgent help at the nearest emergency department.",
} as const;

/** Website credit shown at the foot of every page */
export const credit = {
  name: "Expedyte 360 Co Ltd",
  phoneDisplay: "055 931 3198",
  phoneHref: "tel:+233559313198",
  /** Put the logo file in /public/images/brand/ and set its path here, e.g. "/images/brand/expedyte360.png" */
  logo: "/images/brand/expedyte360-mark.png" as string | null,
};

export const mainNav = [
  { href: "/about", label: "About Dr Sedohia" },
  { href: "/services", label: "Our Services" },
  { href: "/experience", label: "The Experience" },
  { href: "/workplace", label: "Workplace" },
  { href: "/contact", label: "Contact" },
] as const;
