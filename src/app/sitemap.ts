import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/services", "/experience", "/workplace", "/contact", "/private-psychiatrist-ghana", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : p === "/private-psychiatrist-ghana" ? 0.9 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
