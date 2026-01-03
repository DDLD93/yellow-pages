import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AbstractBackground from "@/components/abstract-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Kaduna Business Connect",
  description: "Discover verified businesses in Kaduna State",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased overflow-hidden`}>
        <AbstractBackground />
        {children}
      </body>
    </html>
  );
}
