import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { imageURL } from "@/lib/imageURL";
import { getConfig } from "@/sanity/lib/config/getConfig";
import { getPostBySlug } from "@/sanity/lib/blog/getPostBySlug";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://janwalenda.de";

export async function getBlogPostMetadata(postSlug: string) {
  const [post, config] = await Promise.all([
    getPostBySlug(postSlug),
    getConfig(),
  ]);

  if (!post || !config) {
    return notFound();
  }

  return generateSeoMetadata(
    post.seo,
    config.defaultSeo,
    post.title,
    post.description,
    `/blog/${postSlug}`,
  );
}

export function getBlogPostingSchema(
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>,
  postSlug: string,
) {
  const postUrl = `${SITE_URL}/blog/${postSlug}`;
  const image = post.mainImage
    ? imageURL(post.mainImage).width(1200).height(630).url()
    : post.seo?.ogImage
      ? imageURL(post.seo.ogImage).width(1200).height(630).url()
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.seo?.metaDescription || undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post._updatedAt || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    author: { "@type": "Person", name: "Jan Walenda", url: SITE_URL },
    publisher: { "@type": "Person", name: "Jan Walenda", url: SITE_URL },
    ...(image && { image }),
    url: postUrl,
    inLanguage: "de-DE",
  };
}
