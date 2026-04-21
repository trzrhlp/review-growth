import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Custom Google Reviews | Location-Based Google Review Growth",
    template: "%s | Custom Google Reviews",
  },
  description:
    "Grow Google reviews with targeted, location-based strategies, gradual delivery, realistic content, and support for local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-zinc-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
