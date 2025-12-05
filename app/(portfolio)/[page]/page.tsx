import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { notFound } from "next/navigation";
import PageItem from "@/components/PageItem";
import Image from "next/image";
import { imageURL } from "@/lib/imageURL";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { getConfig } from "@/sanity/lib/config/getConfig";

// Type guard to filter out unknown/invalid content types
function hasRequiredProps(content: unknown): content is { _type: string; _key: string } {
  return typeof content === 'object' && content !== null && '_type' in content && '_key' in content;
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageSlug } = await params;
  const page = await getPageBySlug(pageSlug);
  const config = await getConfig();

  if (!page) {
    return notFound();
  }

  if (!config) {
    return notFound();
  }

  return generateSeoMetadata(page.seo, config.defaultSeo, page.title, page.title);
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageSlug } = await params;

  const page = await getPageBySlug(pageSlug);

  if (!page) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center relative">
      {page.mainImage && (
        <Image
          src={imageURL(page.mainImage).width(1200).height(600).url()}
          alt={page.title || ''}
          width={1200}
          height={600}
        />
      )}
      {Array.isArray(page.content) && page.content.length > 0 && (
        page.content
          .filter(hasRequiredProps)
          .map(content =>
            <PageItem key={content._key} content={content as any} />
          )
      )}
    </div>
  );
}