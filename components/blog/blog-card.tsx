"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
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
  guides: "from-blue-500 to-blue-700",
  industry: "from-gray-500 to-gray-700",
  compliance: "from-green-500 to-green-700",
  growth: "from-purple-500 to-purple-700",
};

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const style = categoryStyles[post.category];

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link href={`/blog/${post.slug}`} className="group block">
          <div className="clean-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="grid md:grid-cols-2">
              {/* Gradient side */}
              <div
                className={`flex items-center justify-center bg-gradient-to-br ${categoryGradients[post.category]} p-10 md:p-14`}
              >
                <div className="text-center">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Featured
                  </span>
                  <p className="mt-4 text-lg font-medium text-white/80">
                    {categoryLabels[post.category]}
                  </p>
                </div>
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <Badge
                  className={`mb-4 w-fit border-0 ${style.bg} ${style.text}`}
                >
                  {categoryLabels[post.category]}
                </Badge>
                <h2 className="font-sans text-2xl font-bold text-gray-900 transition-colors group-hover:text-brand-600 md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 leading-relaxed text-gray-500">
                  {post.description}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="clean-card flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          {/* Category gradient header */}
          <div
            className={`h-2 bg-gradient-to-r ${categoryGradients[post.category]}`}
          />

          <div className="flex flex-1 flex-col p-6">
            <Badge
              className={`mb-3 w-fit border-0 ${style.bg} ${style.text}`}
            >
              {categoryLabels[post.category]}
            </Badge>
            <h3 className="font-sans text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-600">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
              {post.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
