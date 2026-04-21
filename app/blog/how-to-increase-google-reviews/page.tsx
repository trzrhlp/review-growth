import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Increase Google Reviews",
  description:
    "Increase Google reviews with a consistent customer feedback workflow, local targeting, and realistic review growth practices.",
};

export default function Page() {
  return <BlogPostPage {...blogPosts.howToIncreaseGoogleReviews} />;
}
