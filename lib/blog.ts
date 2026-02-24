import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Category = "guides" | "industry" | "compliance" | "growth";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  author: string;
  readTime: string;
  featured: boolean;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    author: data.author ?? "EcoPharma Team",
    readTime: stats.text,
    featured: data.featured ?? false,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
