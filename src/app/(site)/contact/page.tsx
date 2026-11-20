import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import { MailIcon, PhoneIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { getSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description:
    "Contact Calm Restored Wellness in West Trasacco, Accra, Ghana, to enquire about a private consultation with Dr Albert Sedohia, Specialist Psychiatrist. Call +233 24 276 0157.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Request a <em className="font-light italic text-gold-light">consultation.</em></>}
        intro={<p>Speak to the team by telephone, email support@calmrestoredwellness.com, or send a brief enquiry below. We will discuss your needs and the consultation options that may suit you.</p>}
        image="contact"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={settings.phone.href} className="btn btn-light"><PhoneIcon /> Call {settings.phone.display}</a>
          <a href={settings.email.gmailHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light"><MailIcon /> Email us<span className="sr-only"> (opens Gmail in a new tab)</span></a>
        </div>
        <p className="mt-4 text-sm text-ivory/70">
          Not using Gmail? <a href={settings.email.href} className="underline decoration-gold-light/60 underline-offset-4 hover:text-ivory">Open your usual email app</a>.
        </p>
      </PageHero>

      <section aria-label="Emergency information" className="bg-lavender">
        <div className="container-site py-6 text-plum-ink" role="note">
          <strong className="font-medium">In an emergency:</strong> if you or someone else is at immediate risk, go to the nearest emergency department or contact emergency services. This form is not monitored continuously.
        </div>
      </section>

      <ContactSection showPhoto={false} heading="Your journey to calm begins here." />
    </>
  );
}
