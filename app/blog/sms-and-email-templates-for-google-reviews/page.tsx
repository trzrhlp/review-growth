import BlogPostPage from "@/components/BlogPostPage";
import { blogPosts } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SMS and Email Templates for Google Reviews | Local Reviews Boost",
  description:
    "Use short SMS and email templates for asking for Google reviews without sounding forced or generic.",
  path: "/blog/sms-and-email-templates-for-google-reviews",
  type: "article",
});

export default function Page() {
  return (
    <BlogPostPage
      {...blogPosts.smsAndEmailTemplatesForGoogleReviews}
      path="/blog/sms-and-email-templates-for-google-reviews"
    />
  );
}
