import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { BlogCard } from "@/components/blog/blog-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: `${post.title} | EcoPharma`,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  // Get related posts (same category, excluding current)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <BlogPostLayout post={post}>
      {content}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h3 className="mb-8 font-sans text-xl font-bold text-gray-900">
            Continue Reading
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((p, i) => (
              <BlogCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </BlogPostLayout>
  );
}
