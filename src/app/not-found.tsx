import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { getSettings } from "@/lib/cms";

export default async function NotFound() {
  const settings = await getSettings();
  return (
    <>
      <Header phone={settings.phone} location={settings.location.display} />
      <main id="main">
        <PageHero
          eyebrow="Page not found"
          title="We could not find that page."
          intro={<p>The page may have moved. You can return home, explore our services or call us on {settings.phone.display}.</p>}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-light">Return home</Link>
            <Link href="/services" className="btn btn-outline-light">Our services</Link>
          </div>
        </PageHero>
      </main>
      <Footer />
    </>
  );
}
