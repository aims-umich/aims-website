import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { siteConfig, organizationJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const HOME_TITLE =
  "AIMS Lab | Artificial Intelligence and Multiphysics Simulations - University of Michigan";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: HOME_TITLE,
    template: "%s | AIMS Lab",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "AIMS Lab",
    "AIMS Lab University of Michigan",
    "AIMS Research Lab",
    "Artificial Intelligence and Multiphysics Simulations",
    "Majdi Radaideh",
    "scientific machine learning",
    "nuclear engineering machine learning",
    "nuclear reactor AI",
    "physics-informed machine learning",
    "multiphysics simulation",
    "University of Michigan NERS",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: HOME_TITLE,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `The ${siteConfig.name} at the ${siteConfig.university}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <Navbar />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
