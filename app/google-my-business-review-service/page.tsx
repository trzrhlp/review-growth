import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Google My Business Review Service | Local Reviews Boost",
  description:
    "Read the complete guide to Google My Business review service benefits, problems, solutions, FAQs, and location-based review growth strategy.",
  path: "/google-my-business-review-service",
});

export default function Page() {
  return (
    <ArticlePage
      {...servicePages.googleMyBusinessReviewService}
      path="/google-my-business-review-service"
    />
  );
}
