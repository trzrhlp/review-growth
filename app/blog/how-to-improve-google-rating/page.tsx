import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Improve Google Rating",
  description:
    "Improve your Google rating by strengthening customer experience, responding well, and building a consistent review strategy.",
};

export default function Page() {
  return <BlogPostPage {...blogPosts.howToImproveGoogleRating} />;
}
