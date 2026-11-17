import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Page not found"
      title="We could not find that page."
      intro={<p>The page may have moved. You can return home, explore our services or call us on {site.phone.display}.</p>}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-light">Return home</Link>
        <Link href="/services" className="btn btn-outline-light">Our services</Link>
      </div>
    </PageHero>
  );
}
