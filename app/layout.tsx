import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import AbstractBackground from "@/components/abstract-background";
import NavigationProgress from "@/components/navigation-progress";
import { generateMetadata as generateBaseMetadata, generateOrganizationStructuredData, generateWebSiteStructuredData } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = generateBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = generateOrganizationStructuredData();
  const websiteStructuredData = generateWebSiteStructuredData();

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased overflow-hidden`}>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        {/* Global Navigation Progress Bar */}
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <AbstractBackground />
        {children}
      </body>
    </html>
  );
}
