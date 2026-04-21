import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Google Reviews for Local Business Growth",
  description:
    "Build a custom Google reviews strategy with location targeting, gradual delivery, personalized review themes, FAQ content, and clear conversion support.",
};

export default function Page() {
  return <ArticlePage {...servicePages.customGoogleReviews} />;
}
