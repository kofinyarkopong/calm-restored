import "server-only";
import { cache } from "react";
import { createClient, type QueryParams } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { gardenVideo, images as localImages, type ImageKey, type SiteImage } from "@/config/images";
import { faqs as localFaqs } from "@/content/faqs";
import { services as localServices, type Service } from "@/content/services";
import { site } from "@/content/site";
import { apiVersion, dataset, isCmsConfigured, projectId } from "@/sanity/env";

/**
 * Content from the website editor (Sanity), with the built-in content as a fallback.
 * Anything left empty in the editor keeps the original text or photo, and if the
 * editor cannot be reached the site simply carries on with the built-in content.
 * Edits appear on the site within about a minute.
 */

const REVALIDATE_SECONDS = 60;

const client = isCmsConfigured ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" }) : null;
const builder = isCmsConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

async function query<T>(groq: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(groq, params, { next: { revalidate: REVALIDATE_SECONDS, tags: ["cms"] } });
  } catch (err) {
    console.error("Website editor content unavailable, using built-in content.", err instanceof Error ? err.message : "");
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

type CmsImage = {
  asset?: { _ref?: string; _id?: string; metadata?: { dimensions?: { width: number; height: number }; lqip?: string } };
  hotspot?: { x: number; y: number };
  crop?: unknown;
  alt?: string;
  caption?: string;
};

export type GalleryImage = SiteImage & { caption?: string };

const imageFields = `{ ..., asset->{ _id, metadata { dimensions, lqip } } }`;

export function toSiteImage(img: CmsImage | null | undefined, fallback?: SiteImage): GalleryImage | null {
  if (!img?.asset || !builder) return fallback ?? null;
  const dims = img.asset.metadata?.dimensions;
  const focal = img.hotspot ? `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%` : fallback?.focal;
  return {
    src: builder.image(img).width(2400).fit("max").auto("format").quality(82).url(),
    alt: img.alt || fallback?.alt || "",
    width: dims?.width ?? fallback?.width ?? 1600,
    height: dims?.height ?? fallback?.height ?? 1200,
    focal,
    focalMobile: img.hotspot ? focal : fallback?.focalMobile,
    caption: img.caption || undefined,
  };
}

/** All site photographs, with any replaced in the editor swapped in. */
export const getImages = cache(async (): Promise<Record<ImageKey, SiteImage>> => {
  const doc = await query<Record<string, CmsImage>>(`*[_id == "photographs"][0]{ ${Object.keys(localImages).map((k) => `"${k}": ${k}${imageFields}`).join(", ")} }`);
  if (!doc) return localImages;
  const merged = { ...localImages } as Record<ImageKey, SiteImage>;
  for (const key of Object.keys(localImages) as ImageKey[]) {
    const replaced = toSiteImage(doc[key], localImages[key]);
    if (replaced) merged[key] = replaced;
  }
  return merged;
});

export async function getImage(key: ImageKey): Promise<SiteImage> {
  return (await getImages())[key];
}

/* ------------------------------------------------------------------ */
/* Contact details                                                     */
/* ------------------------------------------------------------------ */

export type Settings = {
  phone: { display: string; href: string; e164: string };
  email: { address: string; href: string; gmailHref: string };
  location: { area: string; city: string; country: string; countryCode: string; display: string };
  availabilityNote: string;
};

const gmailCompose = (address: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}&su=${encodeURIComponent("Consultation enquiry")}`;

export const defaultSettings: Settings = {
  phone: site.phone,
  email: site.email,
  location: site.location,
  availabilityNote: site.availabilityNote,
};

export const getSettings = cache(async (): Promise<Settings> => {
  const doc = await query<{ phoneDisplay?: string; phoneInternational?: string; email?: string; location?: string; availabilityNote?: string }>(
    `*[_id == "settings"][0]{ phoneDisplay, phoneInternational, email, location, availabilityNote }`,
  );
  if (!doc) return defaultSettings;
  const e164 = doc.phoneInternational?.replace(/[^\d+]/g, "") || site.phone.e164;
  const email = doc.email?.trim() || site.email.address;
  return {
    phone: { display: doc.phoneDisplay?.trim() || site.phone.display, href: `tel:${e164}`, e164 },
    email: { address: email, href: `mailto:${email}`, gmailHref: gmailCompose(email) },
    location: doc.location?.trim() ? { ...site.location, display: doc.location.trim() } : site.location,
    availabilityNote: doc.availabilityNote?.trim() || site.availabilityNote,
  };
});

/* ------------------------------------------------------------------ */
/* Services and FAQs                                                   */
/* ------------------------------------------------------------------ */

type CmsService = Partial<Pick<Service, "title" | "summary" | "intro" | "coversHeading" | "covers" | "body" | "note">> & {
  slug?: string;
  order?: number;
};

export const getServices = cache(async (): Promise<Service[]> => {
  const docs = await query<CmsService[]>(`*[_type == "service" && defined(slug.current)]{ "slug": slug.current, order, title, summary, intro, coversHeading, covers, body, note }`);
  if (!docs?.length) return localServices;
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  const clean = <T,>(v: T | null | undefined) => (v === null || v === undefined || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && v.length === 0) ? undefined : v);
  const merged = localServices.map((s, i) => {
    const d = bySlug.get(s.slug);
    if (!d) return { s, order: i + 1 };
    return {
      s: {
        ...s,
        title: clean(d.title) ?? s.title,
        summary: clean(d.summary) ?? s.summary,
        intro: clean(d.intro) ?? s.intro,
        coversHeading: clean(d.coversHeading) ?? s.coversHeading,
        covers: clean(d.covers?.filter(Boolean)) ?? s.covers,
        body: clean(d.body?.filter(Boolean)) ?? s.body,
        note: d.note?.heading && d.note?.text ? d.note : d.note ? undefined : s.note,
      },
      order: d.order ?? i + 1,
    };
  });
  return merged
    .sort((a, b) => a.order - b.order)
    .map(({ s }, i) => ({ ...s, number: String(i + 1).padStart(2, "0") }));
});

export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug);
}

export const getFaqs = cache(async (): Promise<{ q: string; a: string }[]> => {
  const docs = await query<{ q?: string; a?: string }[]>(`*[_type == "faq"] | order(order asc, _createdAt asc){ "q": question, "a": answer }`);
  const usable = docs?.filter((d): d is { q: string; a: string } => Boolean(d.q?.trim() && d.a?.trim()));
  return usable?.length ? usable : localFaqs;
});

/* ------------------------------------------------------------------ */
/* Gallery and videos                                                  */
/* ------------------------------------------------------------------ */

export type SiteVideo = { title: string; src: string; poster?: string; portrait: boolean };

type CmsVideo = { title?: string; url?: string; poster?: CmsImage; portrait?: boolean };

const videoFields = `{ title, "url": file.asset->url, poster${imageFields}, portrait }`;

function toVideo(v: CmsVideo | null | undefined): SiteVideo | null {
  if (!v?.url) return null;
  const poster = v.poster?.asset && builder ? builder.image(v.poster).width(1200).auto("format").url() : undefined;
  return { title: v.title || "Video", src: v.url, poster, portrait: v.portrait ?? true };
}

export const defaultVideo: SiteVideo = { title: gardenVideo.label, src: gardenVideo.src, poster: gardenVideo.poster, portrait: true };

export const getMedia = cache(async (): Promise<{ featuredVideo: SiteVideo; gallery: GalleryImage[]; videos: SiteVideo[] }> => {
  const doc = await query<{ featuredVideo?: CmsVideo; gallery?: CmsImage[]; videos?: CmsVideo[] }>(
    `*[_id == "media"][0]{ featuredVideo${videoFields}, gallery[]${imageFields}, videos[]${videoFields} }`,
  );
  return {
    featuredVideo: toVideo(doc?.featuredVideo) ?? defaultVideo,
    gallery: (doc?.gallery ?? []).map((g) => toSiteImage(g)).filter((g): g is GalleryImage => Boolean(g)),
    videos: (doc?.videos ?? []).map(toVideo).filter((v): v is SiteVideo => Boolean(v)),
  };
});

/* ------------------------------------------------------------------ */
/* News                                                                */
/* ------------------------------------------------------------------ */

export type PortableBlock = { _type: string; _key: string; [key: string]: unknown };
export type PostSummary = { title: string; slug: string; date: string; excerpt: string; cover: GalleryImage | null };
export type Post = PostSummary & { body: PortableBlock[] };

type CmsPost = { title: string; slug: string; date: string; excerpt: string; cover?: CmsImage; body?: PortableBlock[] };

const postSummaryFields = `title, "slug": slug.current, date, excerpt, cover${imageFields}`;

export const getPosts = cache(async (limit?: number): Promise<PostSummary[]> => {
  const range = limit ? `[0...${limit}]` : "";
  const docs = await query<CmsPost[]>(`*[_type == "post" && defined(slug.current) && defined(date)] | order(date desc)${range}{ ${postSummaryFields} }`);
  return (docs ?? []).map((d) => ({ ...d, cover: toSiteImage(d.cover) }));
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const d = await query<CmsPost>(
    `*[_type == "post" && slug.current == $slug][0]{ ${postSummaryFields}, body[]{ ..., _type == "photo" => ${imageFields} } }`,
    { slug },
  );
  if (!d) return null;
  return { ...d, cover: toSiteImage(d.cover), body: d.body ?? [] };
});

export const postImageUrl = (img: CmsImage) => toSiteImage(img);
