import { type Viewport, type Metadata } from "next";
import { DM_Serif_Display, Lora, Roboto_Mono } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import Header from "@/components/Header";
import { getConfig } from "@/sanity/lib/config/getConfig";
import Footer from "@/components/Footer";
import CommandMenu from "@/components/CommandMenu";
import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import { getAllPages } from "@/sanity/lib/page/getAllPages";
import WinterSeasonEvent from "@/components/WinterSeasonEvent";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/JsonLd";
import ThemeProvider from "@/components/ThemeProvider";

import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://janwalenda.de";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--dm-serif-display",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--lora",
});

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--roboto",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const defaultSeo = config?.defaultSeo;
  const title =
    defaultSeo?.metaTitle ||
    config?.title ||
    "Jan Walenda – Frontend-Entwickler Hamburg";
  const description =
    defaultSeo?.metaDescription ||
    config?.description ||
    "Frontend-Freelancer in Hamburg für React, Next.js, WordPress und TYPO3.";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    publisher: "Jan Walenda",
    creator: "Jan Walenda",
    icons: {
      icon: "/favicon.png",
    },
    keywords: defaultSeo?.metaKeywords || [
      "Jan Walenda",
      "Frontend-Entwickler",
      "Hamburg",
      "React",
      "Next.js",
      "WordPress",
      "TYPO3",
    ],
    openGraph: {
      title: defaultSeo?.ogTitle || title,
      description: defaultSeo?.ogDescription || description,
      type: "website",
      locale: "de_DE",
      url: SITE_URL,
    },
    twitter: {
      title: defaultSeo?.twitterTitle || defaultSeo?.ogTitle || title,
      description:
        defaultSeo?.twitterDescription ||
        defaultSeo?.ogDescription ||
        description,
      card: "summary_large_image",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

function getSameAsLinks(
  config: NonNullable<Awaited<ReturnType<typeof getConfig>>>,
): string[] {
  const links =
    config.footerColumns?.flatMap((column) => column.links || []) || [];

  return links
    .map((link) => link?.url)
    .filter((url): url is string => Boolean(url?.startsWith("http")));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();
  const posts = await getAllPosts();
  const pages = await getAllPages();
  const sameAs = config ? getSameAsLinks(config) : [];
  const siteDescription =
    config?.defaultSeo?.metaDescription ||
    config?.description ||
    "Frontend-Freelancer in Hamburg für React, Next.js, WordPress und TYPO3.";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Jan Walenda",
      url: SITE_URL,
      description: siteDescription,
      inLanguage: "de-DE",
      publisher: {
        "@type": "Person",
        name: "Jan Walenda",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Jan Walenda",
      url: SITE_URL,
      jobTitle: "Frontend-Entwickler",
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hamburg",
        addressCountry: "DE",
      },
      areaServed: {
        "@type": "City",
        name: "Hamburg",
      },
      knowsAbout: [
        "Frontend Development",
        "React",
        "Next.js",
        "WordPress",
        "TYPO3",
      ],
      ...(sameAs.length > 0 && { sameAs }),
    },
  ];

  return (
    <html
      lang="de"
      className={cn(lora.variable, roboto.variable, dmSerif.variable)}
      suppressHydrationWarning
    >
      <body className={cn("font-roboto", "antialiased relative")}>
        <ThemeProvider>
          <JsonLd data={structuredData} />
          {config && <Header config={config} />}
          <WinterSeasonEvent />
          <CommandMenu pages={pages} posts={posts} />
          <main
            id="content"
            className="
            bg-base-100 
            relative 
            border-b 
            border-b-base-content 
            flex 
            flex-col 
            items-center 
            justify-center 
            min-h-screen
          "
          >
            {children}
          </main>
          {config && <Footer config={config} />}
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
