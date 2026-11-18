import { site } from "@/content/site";
import { isEmailConfigured } from "@/lib/email";
import EnquiryForm, { EnquiryUnavailable } from "./EnquiryForm";
import { PhoneIcon, PinIcon } from "./Icons";
import Photo from "./Photo";

type Props = {
  heading?: string;
  intro?: string;
  defaultService?: string;
  showPhoto?: boolean;
  id?: string;
};

export default function ContactSection({
  heading = "Your journey to calm begins here.",
  intro = "Tell us a little about what you are looking for and the team will be in touch to discuss your needs and suitable consultation options.",
  defaultService,
  showPhoto = true,
  id = "enquiry",
}: Props) {
  const configured = isEmailConfigured();
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="surface-grain bg-ivory-deep py-16 md:py-32">
      <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="eyebrow reveal">Request a consultation</p>
          <h2 id={`${id}-heading`} className="reveal mt-5 text-4xl text-plum md:text-5xl">{heading}</h2>
          <p className="reveal mt-6 max-w-md text-lg text-stone">{intro}</p>

          <ul className="reveal mt-10 space-y-5">
            <li>
              <a href={site.phone.href} className="group flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-light text-plum transition-colors group-hover:bg-plum group-hover:text-ivory"><PhoneIcon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-gold">Telephone</span>
                  <span className="font-serif text-2xl text-plum-ink">{site.phone.display}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-light text-plum"><PinIcon className="h-5 w-5" /></span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-gold">Location</span>
                <span className="text-lg text-plum-ink">{site.location.display}</span>
              </span>
            </li>
          </ul>

          <p className="reveal mt-10 border-l-2 border-gold-light pl-5 font-serif text-lg italic leading-snug text-plum-ink">
            {site.availabilityNote}
          </p>

          {showPhoto && (
            <Photo image="contact" sizes="(min-width:1024px) 30vw, 0px" className="mt-12 hidden aspect-[4/5] max-w-sm rounded-t-[999px] lg:block" />
          )}
        </div>
        <div className="lg:col-span-7">
          <div className="reveal rounded-3xl bg-ivory p-6 shadow-[0_30px_80px_-50px_rgba(46,11,71,0.45)] ring-1 ring-gold-light/40 sm:p-10">
            {configured ? <EnquiryForm defaultService={defaultService} /> : <EnquiryUnavailable />}
          </div>
        </div>
      </div>
    </section>
  );
}
