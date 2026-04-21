import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How to Get Google Reviews | Local Reviews Boost",
  description:
    "Learn how to get Google reviews with practical request timing, direct links, team workflows, and local SEO support.",
  path: "/blog/how-to-get-google-reviews",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.howToGetGoogleReviews}
      path="/blog/how-to-get-google-reviews"
    />
  );
}
