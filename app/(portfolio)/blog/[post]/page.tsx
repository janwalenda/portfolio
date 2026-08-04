import { getPostBySlug } from "@/sanity/lib/blog/getPostBySlug";
import Image from "@/components/Image";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { getConfig } from "@/sanity/lib/config/getConfig";
import Prose from "@/components/Prose";
import { H1 } from "@/components/ui/heading";
import JsonLd from "@/components/JsonLd";
import { imageURL } from "@/lib/imageURL";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://janwalenda.de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post: postSlug } = await params;
  const post = await getPostBySlug(postSlug);
  const config = await getConfig();

  if (!post) {
    return notFound();
  }

  if (!config) {
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

export default async function Post({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post: postSlug } = await params;
  const post = await getPostBySlug(postSlug);

  if (!post) {
    return notFound();
  }

  const postUrl = `${SITE_URL}/blog/${postSlug}`;
  const image = post.mainImage
    ? imageURL(post.mainImage).width(1200).height(630).url()
    : post.seo?.ogImage
      ? imageURL(post.seo.ogImage).width(1200).height(630).url()
      : undefined;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.seo?.metaDescription || undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post._updatedAt || undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: "Jan Walenda",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Jan Walenda",
      url: SITE_URL,
    },
    ...(image && { image }),
    url: postUrl,
    inLanguage: "de-DE",
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <JsonLd data={blogPosting} />
      <div className="flex flex-col gap-4 max-w-5xl w-full">
        <H1 className="text-3xl md:text-4xl font-bold leading-tight">
          {post.title}
        </H1>
        <div className="w-20 h-1 bg-primary rounded-box" />
        <p className="text-base md:text-lg text-base-content/70 leading-relaxed">
          {post.description}
        </p>
        {post.mainImage && (
          <div className="hover-3d">
            <figure>
              <Image
                src={post.mainImage}
                alt={post.mainImage.alt || ""}
                width={1800}
                height={1200}
                className="w-full h-auto"
              />
            </figure>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        )}

        <Prose body={post.body} />
      </div>
    </div>
  );
}
