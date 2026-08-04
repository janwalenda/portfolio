type SanityLinkLike = {
  url?: string | null;
  slug?: {
    current?: string | null;
  } | null;
} | null;

export function getSanityLinkHref(link: SanityLinkLike) {
  return link?.url || (link?.slug?.current ? `/${link.slug.current}` : "#");
}
