import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Google Review Link and QR Code Guide | Local Reviews Boost",
  description:
    "Use Google review links and QR codes to make review requests easier in-store, on-site, and after service.",
  path: "/blog/google-review-link-and-qr-code",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.googleReviewLinkAndQrCode}
      path="/blog/google-review-link-and-qr-code"
    />
  );
}
