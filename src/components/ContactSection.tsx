import { getServices, getSettings } from "@/lib/cms";
import { isEmailConfigured } from "@/lib/email";
import EnquiryForm, { EnquiryUnavailable } from "./EnquiryForm";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";
import Photo from "./Photo";

type Props = {
  heading?: string;
  intro?: string;
  defaultService?: string;
  showPhoto?: boolean;
  id?: string;
};

export default async function ContactSection({
  heading = "Your journey to calm begins here.",
  intro = "Tell us a little about what you are looking for and the team will be in touch to discuss your needs and suitable consultation options.",
  defaultService,
  showPhoto = true,
  id = "enquiry",
}: Props) {
  const configured = isEmailConfigured();
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const contact = { phone: settings.phone, email: settings.email };
  const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="surface-grain bg-ivory-deep py-16 md:py-32">
      <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow reveal">Request a consultation</p>
          <h2 id={`${id}-heading`} className="reveal mt-5 text-4xl text-plum md:text-5xl">{heading}</h2>
          <p className="reveal mt-6 max-w-md text-lg text-stone">{intro}</p>

          <ul className="reveal mt-10 space-y-5">
            <li>
              <a href={settings.phone.href} className="group flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-light text-plum transition-colors group-hover:bg-plum group-hover:text-ivory"><PhoneIcon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-gold">Telephone</span>
                  <span className="font-serif text-2xl text-plum-ink">{settings.phone.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={settings.email.gmailHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-light text-plum transition-colors group-hover:bg-plum group-hover:text-ivory"><MailIcon className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-gold">Email</span>
                  <span className="block break-all text-[0.98rem] text-plum-ink sm:break-normal sm:text-lg">{settings.email.address}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-light text-plum"><PinIcon className="h-5 w-5" /></span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-gold">Location</span>
                <span className="text-lg text-plum-ink">{settings.location.display}</span>
              </span>
            </li>
          </ul>

          <p className="reveal mt-10 border-l-2 border-gold-light pl-5 font-serif text-lg italic leading-snug text-plum-ink">
            {settings.availabilityNote}
          </p>

          {showPhoto && (
            <Photo image="contact" sizes="(min-width:1024px) 30vw, 0px" className="mt-12 hidden aspect-[4/5] max-w-sm rounded-t-[999px] lg:block" />
          )}
        </div>
        <div className="min-w-0 lg:col-span-7">
          <div className="reveal rounded-3xl bg-ivory p-6 shadow-[0_30px_80px_-50px_rgba(46,11,71,0.45)] ring-1 ring-gold-light/40 sm:p-10">
            {configured ? <EnquiryForm defaultService={defaultService} contact={contact} serviceOptions={serviceOptions} /> : <EnquiryUnavailable contact={contact} />}
          </div>
        </div>
      </div>
    </section>
  );
}
