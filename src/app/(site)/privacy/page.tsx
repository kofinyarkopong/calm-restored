import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";
import { getSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Calm Restored Wellness handles the personal information you share through this website.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "17 November 2026";

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy notice" intro={<p>How we handle the information you share with us through this website.</p>} />

      <section className="py-20 md:py-28">
        <div className="container-site">
          <article className="mx-auto max-w-3xl text-lg text-stone [&_h2]:mt-14 [&_h2]:text-3xl [&_h2]:text-plum [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            <p className="!mt-0 text-sm uppercase tracking-[0.16em] text-gold">Last updated {LAST_UPDATED}</p>

            <h2>Who we are</h2>
            <p>
              Calm Restored Wellness is a private mental health service led by {site.clinician.name}, {site.clinician.title}, based in {settings.location.display}. In this notice, &ldquo;we&rdquo; and &ldquo;us&rdquo; refer to Calm Restored Wellness. You can contact us about this notice by telephone on{" "}
              <a href={settings.phone.href} className="text-plum underline">{settings.phone.display}</a> or by email at{" "}
              <a href={settings.email.href} className="text-plum underline">{settings.email.address}</a>.
            </p>

            <h2>Information we collect through the enquiry form</h2>
            <p>When you submit an enquiry, we receive:</p>
            <ul>
              <li>your name;</li>
              <li>your email address and telephone number, where you provide them;</li>
              <li>your preferred contact method;</li>
              <li>the service you are interested in and your preferred consultation format;</li>
              <li>any brief message you choose to include;</li>
              <li>confirmation that you agreed to be contacted about your enquiry.</li>
            </ul>
            <p>
              Please keep your message brief and avoid including detailed medical information or sensitive records. The form does not accept file uploads.
            </p>

            <h2>How we use your information</h2>
            <p>
              We use the information only to respond to your enquiry, to discuss your needs and suitable consultation options, and to arrange an appointment if you wish to proceed. Submitting an enquiry does not create an appointment or a clinical relationship.
            </p>

            <h2>How your enquiry is sent and stored</h2>
            <ul>
              <li>Your enquiry is sent securely from this website to our team by email, using a transactional email provider (Resend). The provider processes the message in order to deliver it.</li>
              <li>The website does not store enquiries in a database.</li>
              <li>Enquiries are received in our team&apos;s email inbox and are kept only for as long as needed to respond and to manage any resulting appointment.</li>
              <li>The contents of your enquiry are not used for advertising or analytics.</li>
            </ul>

            <h2>Website hosting, security and cookies</h2>
            <p>
              The website is hosted by Vercel. Like most websites, the hosting service may briefly process technical information such as your IP address and browser type in order to deliver pages and protect the service. We use your IP address temporarily to limit repeated form submissions and prevent misuse.
            </p>
            <p>
              The website does not use advertising cookies, analytics tracking or social media trackers.
            </p>

            <h2>Sharing your information</h2>
            <p>
              We do not sell your information. We share it only with the service providers described above, with others you ask us to involve, or where we are required to do so by law or professional obligations, for example where there is a serious risk to someone&apos;s safety.
            </p>

            <h2>Confidentiality of clinical care</h2>
            <p>
              If you go on to receive care, your clinical information is handled under professional duties of confidentiality. These duties have limits set by law and professional guidance, and Dr Sedohia will explain them to you.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You may ask us what information we hold about you from an enquiry, ask us to correct it, or ask us to delete it where we are not required to keep it. You may also have rights under applicable data protection law, including Ghana&apos;s Data Protection Act, 2012 (Act 843). To make a request, please contact us by telephone or email.
            </p>

            <h2>Emergencies</h2>
            <p>
              The enquiry form is not monitored continuously. If you or someone else is at immediate risk, go to the nearest emergency department or contact emergency services.
            </p>

            <h2>Changes to this notice</h2>
            <p>
              We may update this notice from time to time. The date at the top shows when it was last revised.
            </p>

            <p className="!mt-14">
              <Link href="/contact" className="text-link">Return to contact</Link>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
