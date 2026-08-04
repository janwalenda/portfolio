import { type Metadata } from "next";
import { getConfig } from "@/sanity/lib/config/getConfig";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://janwalenda.de";
const DEFAULT_DESCRIPTION =
  "Frontend-Freelancer in Hamburg fuer React, Next.js, WordPress und TYPO3.";

export async function getPortfolioMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const defaultSeo = config?.defaultSeo;
  const title =
    defaultSeo?.metaTitle ||
    config?.title ||
    "Jan Walenda - Frontend-Entwickler Hamburg";
  const description =
    defaultSeo?.metaDescription || config?.description || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    publisher: "Jan Walenda",
    creator: "Jan Walenda",
    icons: { icon: "/favicon.png" },
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
