import LegalPage from "@/components/LegalPage";
import { legalPages } from "@/lib/legalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Local Reviews Boost",
  description:
    "Read the Local Reviews Boost privacy policy covering submitted information, data use, and support requests.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage {...legalPages.privacyPolicy} path="/privacy-policy" />;
}
