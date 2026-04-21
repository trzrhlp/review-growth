import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google My Business Review Service Guide",
  description:
    "Read the complete guide to Google My Business review service benefits, problems, solutions, FAQs, and location-based review growth strategy.",
};

export default function Page() {
  return <ArticlePage {...servicePages.googleMyBusinessReviewService} />;
}
