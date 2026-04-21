import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Increase Google Reviews | Local Reviews Boost",
  description:
    "Increase Google reviews with a structured reputation strategy, location targeting, and practical review management support for local businesses.",
  path: "/increase-google-reviews",
});

export default function Page() {
  return (
    <ArticlePage
      {...servicePages.increaseGoogleReviews}
      path="/increase-google-reviews"
    />
  );
}
