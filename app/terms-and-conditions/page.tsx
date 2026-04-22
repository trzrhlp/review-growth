import LegalPage from "@/components/LegalPage";
import { legalPages } from "@/lib/legalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions | Local Reviews Boost",
  description:
    "Review the Local Reviews Boost terms and conditions for website use, orders, and service scope.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return (
    <LegalPage
      {...legalPages.termsAndConditions}
      path="/terms-and-conditions"
    />
  );
}
