import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How to Increase Google Reviews | Local Reviews Boost",
  description:
    "Increase Google reviews with a consistent customer feedback workflow, local targeting, and realistic review growth practices.",
  path: "/blog/how-to-increase-google-reviews",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.howToIncreaseGoogleReviews}
      path="/blog/how-to-increase-google-reviews"
    />
  );
}
