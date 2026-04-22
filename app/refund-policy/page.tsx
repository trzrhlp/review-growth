import LegalPage from "@/components/LegalPage";
import { legalPages } from "@/lib/legalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Refund Policy | Local Reviews Boost",
  description:
    "Read the Local Reviews Boost refund policy for order reviews, eligibility, and support requests.",
  path: "/refund-policy",
});

export default function Page() {
  return <LegalPage {...legalPages.refundPolicy} path="/refund-policy" />;
}
