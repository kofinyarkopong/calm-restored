import Link from "next/link";
import type { PostSummary } from "@/lib/cms";
import { ArrowRight } from "./Icons";
import Photo from "./Photo";

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function NewsCard({ post, delay = 0 }: { post: PostSummary; delay?: number }) {
  return (
    <article className="reveal group h-full" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      <Link href={`/news/${post.slug}`} className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold-light/50 bg-ivory transition-colors hover:bg-white">
        {post.cover ? (
          <Photo image={post.cover} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" reveal={false} className="aspect-[3/2]" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <div aria-hidden className="aspect-[3/2] bg-[radial-gradient(120%_90%_at_30%_20%,#f6efe3_0%,#ece0f1_55%,#ddcde8_100%)]" />
        )}
        <div className="flex flex-1 flex-col p-7">
          <time dateTime={post.date} className="text-xs uppercase tracking-[0.18em] text-gold">{formatDate(post.date)}</time>
          <h3 className="mt-3 text-2xl leading-snug text-plum-ink">{post.title}</h3>
          <p className="mt-3 flex-1 text-stone">{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-plum">Read more <ArrowRight /></span>
        </div>
      </Link>
    </article>
  );
}
