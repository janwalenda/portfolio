import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import { getConfig } from "@/sanity/lib/config/getConfig";
import { getAllPages } from "@/sanity/lib/page/getAllPages";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://janwalenda.de";
const DEFAULT_DESCRIPTION =
  "Frontend-Freelancer in Hamburg fuer React, Next.js, WordPress und TYPO3.";

function getSameAsLinks(
  config: NonNullable<Awaited<ReturnType<typeof getConfig>>>,
) {
  const links =
    config.footerColumns?.flatMap((column) => column.links || []) || [];

  return links
    .map((link) => link?.url)
    .filter((url): url is string => Boolean(url?.startsWith("http")));
}

export async function getPortfolioLayoutData() {
  const [config, posts, pages] = await Promise.all([
    getConfig(),
    getAllPosts(),
    getAllPages(),
  ]);
  const sameAs = config ? getSameAsLinks(config) : [];
  const siteDescription =
    config?.defaultSeo?.metaDescription ||
    config?.description ||
    DEFAULT_DESCRIPTION;

  return {
    config,
    posts,
    pages,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Jan Walenda",
        url: SITE_URL,
        description: siteDescription,
        inLanguage: "de-DE",
        publisher: { "@type": "Person", name: "Jan Walenda" },
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
        areaServed: { "@type": "City", name: "Hamburg" },
        knowsAbout: [
          "Frontend Development",
          "React",
          "Next.js",
          "WordPress",
          "TYPO3",
        ],
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
  };
}
