import type { Seo, SiteSettings } from "@/sanity.types";
import { imageURL } from "./imageURL";
import { type Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://janwalenda.de";

/**
 * Merges page/post-specific SEO with default site SEO settings
 * Page/post SEO takes precedence over defaults
 */
export function generateSeoMetadata(
  pageSeo?: Seo | null,
  defaultSeo?: SiteSettings["defaultSeo"],
  fallbackTitle?: string,
  fallbackDescription?: string,
  path?: string
): Metadata {
  const metaTitle =
    pageSeo?.metaTitle ||
    defaultSeo?.metaTitle ||
    fallbackTitle ||
    "Jan Walenda";

  const metaDescription =
    pageSeo?.metaDescription ||
    defaultSeo?.metaDescription ||
    fallbackDescription ||
    "";

  const ogTitle =
    pageSeo?.ogTitle ||
    pageSeo?.metaTitle ||
    defaultSeo?.ogTitle ||
    defaultSeo?.metaTitle ||
    fallbackTitle ||
    "Jan Walenda";

  const ogDescription =
    pageSeo?.ogDescription ||
    pageSeo?.metaDescription ||
    defaultSeo?.ogDescription ||
    defaultSeo?.metaDescription ||
    fallbackDescription ||
    "";

  const twitterTitle =
    pageSeo?.twitterTitle ||
    pageSeo?.ogTitle ||
    pageSeo?.metaTitle ||
    defaultSeo?.twitterTitle ||
    defaultSeo?.ogTitle ||
    defaultSeo?.metaTitle ||
    fallbackTitle ||
    "Jan Walenda";

  const twitterDescription =
    pageSeo?.twitterDescription ||
    pageSeo?.ogDescription ||
    pageSeo?.metaDescription ||
    defaultSeo?.twitterDescription ||
    defaultSeo?.ogDescription ||
    defaultSeo?.metaDescription ||
    fallbackDescription ||
    "";

  const ogImage = pageSeo?.ogImage || defaultSeo?.ogImage;
  const twitterImage =
    pageSeo?.twitterImage ||
    pageSeo?.ogImage ||
    defaultSeo?.twitterImage ||
    defaultSeo?.ogImage;

  const openGraphImages = ogImage
    ? [
        {
          url: imageURL(ogImage).width(1200).height(630).url(),
          alt: ogImage.alt || metaTitle,
          width: 1200,
          height: 630,
        },
      ]
    : undefined;

  const twitterImages = twitterImage
    ? [imageURL(twitterImage).width(1200).height(675).url()]
    : undefined;

  const keywords = pageSeo?.metaKeywords || defaultSeo?.metaKeywords;

  const noIndex = pageSeo?.noIndex ?? defaultSeo?.noIndex ?? false;
  const noFollow = pageSeo?.noFollow ?? defaultSeo?.noFollow ?? false;

  const manualCanonical = pageSeo?.canonicalUrl || defaultSeo?.canonicalUrl;
  const canonicalUrl =
    manualCanonical ||
    (path !== undefined
      ? new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString()
      : undefined);

  const twitterCard =
    (pageSeo?.twitterCard as
      | "summary"
      | "summary_large_image"
      | "app"
      | "player") ||
    (defaultSeo?.twitterCard as
      | "summary"
      | "summary_large_image"
      | "app"
      | "player") ||
    "summary_large_image";

  return {
    title: metaTitle,
    description: metaDescription,
    ...(keywords && keywords.length > 0 && { keywords }),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(openGraphImages && { images: openGraphImages }),
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      ...(twitterImages && { images: twitterImages }),
    },
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
  };
}
