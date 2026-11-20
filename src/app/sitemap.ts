import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPosts, getServices } from "@/lib/cms";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  const pages = ["", "/about", "/services", "/experience", "/workplace", "/contact", "/private-psychiatrist-ghana", "/news", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : p === "/private-psychiatrist-ghana" ? 0.9 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/news/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
  ];
}
