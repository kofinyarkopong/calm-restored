import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import ContactSection from "@/components/ContactSection";
import { ArrowRight } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { formatDate } from "@/components/NewsCard";
import Photo from "@/components/Photo";
import { site } from "@/content/site";
import { getPost, getPosts, postImageUrl } from "@/lib/cms";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: post.cover?.src ? [{ url: post.cover.src }] : undefined },
  };
}

const components: PortableTextComponents = {
  types: {
    photo: ({ value }) => {
      const img = postImageUrl(value);
      if (!img) return null;
      return (
        <figure className="my-10">
          <Photo image={img} sizes="(min-width:768px) 720px, 90vw" naturalShape reveal={false} className="rounded-2xl" />
          {img.caption && <figcaption className="mt-3 text-[0.95rem] text-stone">{img.caption}</figcaption>}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="mt-12 text-3xl text-plum md:text-4xl">{children}</h2>,
    blockquote: ({ children }) => <blockquote className="my-8 border-l-4 border-gold pl-6 font-serif text-2xl italic text-plum-ink">{children}</blockquote>,
    normal: ({ children }) => <p className="mt-5">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} className="text-plum underline decoration-gold-light underline-offset-4" target={value?.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function NewsArticlePage({ params }: Params) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.cover?.src ?? undefined,
    author: { "@id": `${site.url}/#physician` },
    publisher: { "@id": `${site.url}/#practice` },
    mainEntityOfPage: `${site.url}/news/${post.slug}`,
  };
  return (
    <>
      <JsonLd data={schema} />
      <article>
        <header className="relative overflow-hidden bg-aubergine text-ivory">
          <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-plum/40 blur-[120px] glow-drift" />
          <div className="container-site relative max-w-4xl pb-14 pt-32 md:pb-20 md:pt-44">
            <Link href="/news" className="eyebrow hero-in !text-gold-light">News</Link>
            <h1 className="hero-in mt-6 text-[2.3rem] leading-[1.08] sm:text-5xl lg:text-6xl" style={{ "--delay": "120ms" } as React.CSSProperties}>{post.title}</h1>
            <time dateTime={post.date} className="hero-in mt-6 block text-sm uppercase tracking-[0.18em] text-ivory/70" style={{ "--delay": "240ms" } as React.CSSProperties}>
              {formatDate(post.date)}
            </time>
          </div>
        </header>
        <div className="container-site max-w-3xl py-14 md:py-20">
          {post.cover && (
            <figure className="mb-10">
              <Photo image={post.cover} sizes="(min-width:768px) 760px, 90vw" naturalShape reveal={false} priority className="rounded-2xl" />
              {post.cover.caption && <figcaption className="mt-3 text-[0.95rem] text-stone">{post.cover.caption}</figcaption>}
            </figure>
          )}
          <p className="font-serif text-2xl leading-snug text-plum-ink">{post.excerpt}</p>
          <div className="text-lg leading-relaxed text-stone">
            <PortableText value={post.body as never} components={components} />
          </div>
          <Link href="/news" className="btn btn-primary mt-14">All news <ArrowRight /></Link>
        </div>
      </article>
      <ContactSection showPhoto={false} />
    </>
  );
}
