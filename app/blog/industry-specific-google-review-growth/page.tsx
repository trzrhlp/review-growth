import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industry-Specific Google Review Growth Strategies | Local Reviews Boost",
  description:
    "Plan Google review growth around healthcare, trades, hospitality, professional services, and other local industries.",
  path: "/blog/industry-specific-google-review-growth",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.industrySpecificGoogleReviewGrowth}
      path="/blog/industry-specific-google-review-growth"
    />
  );
}
