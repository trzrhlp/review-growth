import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How to Respond to Negative Google Reviews | Local Reviews Boost",
  description:
    "Learn how to respond to negative Google reviews with calm, practical replies that protect trust and support conversion.",
  path: "/blog/respond-to-negative-google-reviews",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.respondToNegativeGoogleReviews}
      path="/blog/respond-to-negative-google-reviews"
    />
  );
}
