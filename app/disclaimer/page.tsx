import LegalPage from "@/components/LegalPage";
import { legalPages } from "@/lib/legalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer | Local Reviews Boost",
  description:
    "Read the Local Reviews Boost disclaimer covering informational use, third-party references, and no guaranteed results.",
  path: "/disclaimer",
});

export default function Page() {
  return <LegalPage {...legalPages.disclaimer} path="/disclaimer" />;
}
