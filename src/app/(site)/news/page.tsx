import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import NewsCard from "@/components/NewsCard";
import PageHero from "@/components/PageHero";
import { getPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "News and Mental Health Insights",
  description: "News, announcements and mental health insights from Calm Restored Wellness and Dr Albert Sedohia, Specialist Psychiatrist in Accra, Ghana.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="News"
        title={<>News and <em className="font-light italic text-gold-light">insights.</em></>}
        intro={<p>Announcements from the practice and practical reflections on mental health from Dr Albert Sedohia.</p>}
      />
      <section aria-label="Articles" className="py-16 md:py-28">
        <div className="container-site">
          {posts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => <NewsCard key={p.slug} post={p} delay={(i % 3) * 80} />)}
            </div>
          ) : (
            <p className="max-w-xl text-lg text-stone">News and articles will appear here soon.</p>
          )}
        </div>
      </section>
      <ContactSection showPhoto={false} />
    </>
  );
}
