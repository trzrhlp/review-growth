import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get More Google Reviews for Local Business",
  description:
    "Get more Google reviews with a gradual, location-based strategy built for trust, visibility, and local search growth.",
};

export default function Page() {
  return <ArticlePage {...servicePages.getMoreGoogleReviews} />;
}
