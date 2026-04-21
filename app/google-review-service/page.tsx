import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Google Review Service | Local Reviews Boost",
  description:
    "Use a professional Google review service to strengthen local trust, improve profile credibility, and support location-based SEO.",
  path: "/google-review-service",
});

export default function Page() {
  return (
    <ArticlePage
      {...servicePages.googleReviewService}
      path="/google-review-service"
    />
  );
}
