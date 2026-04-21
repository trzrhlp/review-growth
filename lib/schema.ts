import { absoluteUrl, seoConfig } from "@/lib/seo";
import { supportEmail, whatsappDisplayNumber, whatsappHref } from "@/lib/contact";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    email: supportEmail,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: supportEmail,
        telephone: whatsappDisplayNumber,
        url: whatsappHref,
        availableLanguage: "English",
      },
    ],
    sameAs: [whatsappHref],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
  };
}

export function buildFaqSchema(
  items: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path).toString(),
    })),
  };
}
