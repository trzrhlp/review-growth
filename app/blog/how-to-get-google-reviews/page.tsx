import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Get Google Reviews",
  description:
    "Learn how to get Google reviews with practical request timing, direct links, team workflows, and local SEO support.",
};

export default function Page() {
  return <BlogPostPage {...blogPosts.howToGetGoogleReviews} />;
}
