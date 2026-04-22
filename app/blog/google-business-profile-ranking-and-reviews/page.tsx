import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Google Business Profile Ranking and Reviews | Local Reviews Boost",
  description:
    "Understand how Google Business Profile reviews support local visibility, trust, and conversion.",
  path: "/blog/google-business-profile-ranking-and-reviews",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.googleBusinessProfileRankingAndReviews}
      path="/blog/google-business-profile-ranking-and-reviews"
    />
  );
}
