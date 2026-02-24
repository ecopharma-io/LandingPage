import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost, Category } from "@/lib/blog";

const categoryStyles: Record<Category, { bg: string; text: string }> = {
  guides: { bg: "bg-blue-50", text: "text-blue-700" },
  industry: { bg: "bg-gray-100", text: "text-gray-700" },
  compliance: { bg: "bg-green-50", text: "text-green-700" },
  growth: { bg: "bg-purple-50", text: "text-purple-700" },
};

const categoryLabels: Record<Category, string> = {
  guides: "Guide",
  industry: "Industry",
  compliance: "Compliance",
  growth: "Growth",
};

const categoryGradients: Record<Category, string> = {
  guides: "from-blue-600 to-blue-800",
  industry: "from-gray-600 to-gray-800",
  compliance: "from-green-600 to-green-800",
  growth: "from-purple-600 to-purple-800",
};

interface BlogPostLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  const style = categoryStyles[post.category];

  return (
    <article>
      {/* Hero */}
      <div
        className={`bg-gradient-to-br ${categoryGradients[post.category]} pb-16 pt-32 lg:pb-20 lg:pt-40`}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>

          <Badge className={`mb-4 border-0 ${style.bg} ${style.text}`}>
            {categoryLabels[post.category]}
          </Badge>

          <h1 className="font-sans text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="prose prose-lg prose-gray mx-auto max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-brand-50 p-8 text-center sm:p-12">
          <h3 className="font-sans text-2xl font-bold text-gray-900">
            Ready to take your pharmacy online?
          </h3>
          <p className="mt-3 text-gray-500">
            Join the pharmacies already building their online future with
            EcoPharma. Set up in 30 minutes, go live in 24 hours.
          </p>
          <Link
            href="/#pricing"
            className="mt-6 inline-flex h-12 items-center rounded-xl bg-brand-600 px-8 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Claim Lifetime Access
          </Link>
        </div>
      </div>
    </article>
  );
}
