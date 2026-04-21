import type { MetadataRoute } from "next";
import { locationEntries } from "@/lib/locations";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/custom-google-reviews",
  "/get-more-google-reviews",
  "/google-my-business-review-service",
  "/google-review-service",
  "/increase-google-reviews",
  "/start-order",
];

const blogRoutes = [
  "/blog/how-to-get-google-reviews",
  "/blog/how-to-increase-google-reviews",
  "/blog/how-to-improve-google-rating",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,
    ...blogRoutes,
    ...locationEntries.map((location) => location.href),
  ].map((path) => ({
    url: absoluteUrl(path).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
