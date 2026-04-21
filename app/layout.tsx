import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/schema";
import { seoConfig } from "@/lib/seo";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  applicationName: seoConfig.siteName,
  title: seoConfig.siteName,
  description: seoConfig.defaultDescription,
  verification: {
    google: "85n7IW3k7PzJNjhTIbJZ8a7OwCExLUhoAsj3hhJugqs",
  },
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  openGraph: {
    title: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.siteName,
    description: seoConfig.defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-zinc-950">
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebSiteSchema()} />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
