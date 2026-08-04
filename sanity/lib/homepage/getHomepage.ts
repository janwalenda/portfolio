import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const homepageQuery = defineQuery(`
  *[_type == "homepage" && _id == "homepage"][0] {
    heroSection {
      badgeEnabled,
      badgeText,
      title,
      subtitle,
      image,
      primaryCta-> {
        title,
        slug,
        url,
        icon
      },
      secondaryCta-> {
        title,
        slug,
        url,
        icon
      }
    },
    servicesTitle,
    servicesSubtitle,
    services[] {
      _type,
      title,
      description,
      icon
    },
    techStackTitle,
    techStackSubtitle,
    techStack[] {
      _type,
      name,
      icon,
      level,
      experience,
      projects
    },
    selectedWorkTitle,
    selectedWorkSubtitle,
    selectedWorkCount,
    ctaSection {
      title,
      subtitle,
      primaryCta-> {
        title,
        slug,
        url,
        icon
      },
      secondaryCta-> {
        title,
        slug,
        url,
        icon
      }
    },
    pageBuilder[] {
      _key,
      _type,
      _type == "hero" => {
        ...,
      },
      _type == "splitImage" => {
        ...,
      },
      _type == "features" => {
        ...,
      },
      _type == "faqs" => {
        ...,
        faqs[]->
      },
      _type == "grid" => {
        ...,
        components[]-> {
          ...,
          action[]->
        }
      },
      _type == "textBlock" => {
        ...,
      }
    }
  }
`);

export async function getHomepage() {
  const { data } = await sanityFetch({
    query: homepageQuery,
    perspective: "published",
  });

  return data;
}
