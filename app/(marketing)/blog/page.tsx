import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, guides, and strategies for independent pharmacies looking to compete online. Learn about e-commerce, HIPAA compliance, telehealth, and more.",
  openGraph: {
    title: "Blog | EcoPharma",
    description:
      "Insights, guides, and strategies for independent pharmacies looking to compete online.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((p) => p.featured);
  const otherPosts = posts.filter((p) => !p.featured);

  return (
    <PageTransition>
    <section className="bg-surface-2 pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-brand-600">
              Blog
            </span>
            <h1 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Insights for Independent Pharmacies
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Guides, strategies, and industry insights to help your pharmacy
              thrive in the digital age.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mt-14">
            <BlogCard post={featuredPost} featured />
          </div>
        )}

        {/* Post Grid */}
        {otherPosts.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {otherPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
    </PageTransition>
  );
}
