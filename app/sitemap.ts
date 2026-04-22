import type { MetadataRoute } from "next";
import { blogPostEntries } from "@/lib/blogRegistry";
import { countryEntries, locationEntries } from "@/lib/locations";
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
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
  "/disclaimer",
  "/start-order",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,
    ...blogPostEntries.map((post) => post.href),
    ...countryEntries.map((country) => country.href),
    ...locationEntries.map((location) => location.href),
  ].map((path) => ({
    url: absoluteUrl(path).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
