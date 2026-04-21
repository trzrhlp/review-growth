import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How to Improve Google Rating | Local Reviews Boost",
  description:
    "Improve your Google rating by strengthening customer experience, responding well, and building a consistent review strategy.",
  path: "/blog/how-to-improve-google-rating",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.howToImproveGoogleRating}
      path="/blog/how-to-improve-google-rating"
    />
  );
}
