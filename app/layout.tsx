import type { Metadata } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/constants";
import "./globals.css";

// ============================================
// Fonts
// ============================================

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// ============================================
// Global SEO Metadata
// ============================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: "%s | EcoPharma",
    default: "EcoPharma — Your Pharmacy, Online in 24 Hours",
  },
  description: SITE.description,
  keywords: [
    "pharmacy e-commerce",
    "independent pharmacy",
    "online pharmacy platform",
    "pharmacy website builder",
    "prescription management",
    "HIPAA compliant pharmacy",
    "pharmacy telehealth",
    "pharmacy delivery",
    "EcoPharma",
  ],
  openGraph: {
    title: "EcoPharma — Your Pharmacy, Online in 24 Hours",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoPharma — Your Pharmacy, Online in 24 Hours",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${sourceSerif.variable} antialiased`}
      >
        {/* Skip link for keyboard accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        {children}

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
