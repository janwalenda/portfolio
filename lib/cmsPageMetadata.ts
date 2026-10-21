import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { getConfig } from "@/sanity/lib/config/getConfig";
import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { notFound } from "next/navigation";

export async function getCmsPageMetadata(pageSlug: string[]) {
  const slug = pageSlug.join("/");
  const [page, config] = await Promise.all([getPageBySlug(slug), getConfig()]);

  if (!page || !config) {
    return notFound();
  }

  return generateSeoMetadata(
    page.seo,
    config.defaultSeo,
    page.title,
    page.title,
    `/${slug}`,
  );
}
