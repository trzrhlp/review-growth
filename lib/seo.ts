import type { Metadata } from "next";

const siteUrl = "https://localreviewsboost.com";
const siteName = "Local Reviews Boost";
const defaultDescription =
  "Grow your Google reviews with location-based strategies that improve trust, visibility, and local rankings.";

type BuildMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl);
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  type = "website",
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const seoConfig = {
  siteName,
  siteUrl,
  defaultDescription,
};
