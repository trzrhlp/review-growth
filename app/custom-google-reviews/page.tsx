import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Local Reviews Boost | Personalized Review Growth",
  description:
    "Build a personalized Google review growth strategy with location targeting, customer feedback themes, FAQ content, and clear reputation support.",
  path: "/custom-google-reviews",
});

export default function Page() {
  return (
    <ArticlePage
      {...servicePages.customGoogleReviews}
      path="/custom-google-reviews"
    />
  );
}
