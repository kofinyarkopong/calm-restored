import type { ImageKey } from "@/config/images";
import Photo from "./Photo";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: ImageKey;
  children?: React.ReactNode;
};

/** Dark editorial page opening, with an optional portrait on the right. */
export default function PageHero({ eyebrow, title, intro, image, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-aubergine text-ivory">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-plum/40 blur-[120px]" />
      <div className={`container-site relative grid items-end gap-12 pb-14 pt-32 md:pb-24 md:pt-44 ${image ? "lg:grid-cols-12" : ""}`}>
        <div className={image ? "lg:col-span-7 lg:pb-6" : "max-w-4xl"}>
          <p className="eyebrow hero-in !text-gold-light">{eyebrow}</p>
          <h1 className="hero-in mt-6 text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.6rem]" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {title}
          </h1>
          {intro && (
            <div className="hero-in mt-8 max-w-2xl text-lg leading-relaxed text-ivory/80 md:text-xl" style={{ "--delay": "240ms" } as React.CSSProperties}>
              {intro}
            </div>
          )}
          {children && <div className="hero-in mt-10" style={{ "--delay": "360ms" } as React.CSSProperties}>{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <Photo image={image} priority sizes="(min-width:1024px) 40vw, 90vw" className="hero-image-in mx-auto aspect-[4/5] max-w-[20rem] rounded-t-[999px] sm:max-w-md lg:max-w-none" reveal={false} />
          </div>
        )}
      </div>
    </section>
  );
}
