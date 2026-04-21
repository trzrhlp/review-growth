import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get More Google Reviews | Local Reviews Boost",
  description:
    "Get more Google reviews with a gradual, location-based strategy built for trust, visibility, and local search growth.",
  path: "/get-more-google-reviews",
});

export default function Page() {
  return (
    <ArticlePage
      {...servicePages.getMoreGoogleReviews}
      path="/get-more-google-reviews"
    />
  );
}
