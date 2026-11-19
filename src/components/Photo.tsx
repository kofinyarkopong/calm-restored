import Image from "next/image";
import { images, type ImageKey, type SiteImage } from "@/config/images";

type Props = {
  image: ImageKey | SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Wrap in a gentle reveal-on-scroll */
  reveal?: boolean;
  delay?: number;
};

/**
 * Renders a photograph from the central image configuration.
 * The parent decides the shape (e.g. `aspect-[4/5]`); the photo fills it.
 * When `src` is null, an elegant temporary panel is shown instead.
 */
export default function Photo({ image, sizes, priority, className = "", imgClassName = "", reveal = true, delay = 0 }: Props) {
  const img: SiteImage = typeof image === "string" ? images[image] : image;
  const style = {
    "--fp": img.focal ?? "50% 50%",
    "--fpm": img.focalMobile ?? img.focal ?? "50% 50%",
    "--delay": `${delay}ms`,
  } as React.CSSProperties;

  return (
    <div className={`relative overflow-hidden ${reveal ? "reveal-image" : ""} ${className}`} style={style}>
      {img.src ? (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={80}
          className={`object-cover object-[var(--fpm)] md:object-[var(--fp)] ${imgClassName}`}
        />
      ) : (
        <Placeholder label={img.placeholderLabel ?? "Photograph to follow"} alt={img.alt} />
      )}
    </div>
  );
}

function Placeholder({ label, alt }: { label: string; alt: string }) {
  return (
    <div
      role="img"
      aria-label={`${alt} (photograph to follow)`}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(120%_90%_at_30%_20%,#f6efe3_0%,#ece0f1_55%,#ddcde8_100%)]"
    >
      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-[0.22]" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#49047e" strokeWidth="0.6">
          <path d="M100 190 C100 140 96 110 100 60" />
          <path d="M100 120 C80 112 70 96 66 80 C84 84 96 98 100 120Z" />
          <path d="M100 100 C120 92 130 76 134 60 C116 64 104 78 100 100Z" />
          <path d="M100 150 C78 146 62 132 54 114 C76 116 92 130 100 150Z" />
          <path d="M100 136 C122 132 138 118 146 100 C124 102 108 116 100 136Z" />
        </g>
      </svg>
      <div className="absolute inset-4 border border-gold-light/70" aria-hidden />
      <span className="relative font-serif text-xl italic text-plum/80">Calm Restored Wellness</span>
      {process.env.NODE_ENV !== "production" && (
        <span className="relative mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-gold">{label}</span>
      )}
    </div>
  );
}
