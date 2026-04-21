import ArticlePage from "@/components/ArticlePage";
import { servicePages } from "@/lib/serviceContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Increase Google Reviews with Local Review Growth",
  description:
    "Increase Google reviews with realistic content, gradual delivery, location targeting, and a simple order process for local businesses.",
};

export default function Page() {
  return <ArticlePage {...servicePages.increaseGoogleReviews} />;
}
