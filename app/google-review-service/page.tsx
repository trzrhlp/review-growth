import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Review Service for Local SEO and Trust",
  description:
    "Use a professional Google review service to strengthen local trust, improve profile credibility, and support location-based SEO.",
};

export default function Page() {
  return <ArticlePage {...servicePages.googleReviewService} />;
}
