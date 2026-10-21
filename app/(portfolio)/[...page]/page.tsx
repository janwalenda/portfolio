import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { notFound } from "next/navigation";
import PageItem, { type PageItemProps } from "@/components/PageItem";
import Image from "@/components/Image";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { getConfig } from "@/sanity/lib/config/getConfig";
import { H1 } from "@/components/ui/heading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page: pageSlug } = await params;
  const page = await getPageBySlug(pageSlug.join("/"));
  const config = await getConfig();

  if (!page) {
    return notFound();
  }

  if (!config) {
    return notFound();
  }

  const slugPath = `/${pageSlug.join("/")}`;

  return generateSeoMetadata(
    page.seo,
    config.defaultSeo,
    page.title,
    page.title,
    slugPath,
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page: pageSlug } = await params;
  const page = await getPageBySlug(pageSlug.join("/"));

  if (!page) {
    return notFound();
  }

  const firstContent = Array.isArray(page.content) ? page.content[0] : null;
  const heroOwnsPageTitle =
    firstContent?._type === "hero" &&
    Boolean(firstContent.title) &&
    firstContent.title === page.title;

  return (
    <div
      className="
      w-full 
      flex 
      flex-col 
      gap-4 
      items-center 
      justify-center 
      relative p-4
    "
    >
      {page.title && !heroOwnsPageTitle && (
        <H1 className="text-4xl md:text-5xl font-bold">{page.title}</H1>
      )}
      {page.mainImage && (
        <Image
          src={page.mainImage}
          alt=""
          width={1200}
          height={600}
          className="object-cover h-auto"
        />
      )}
      {Array.isArray(page.content) &&
        page.content.length > 0 &&
        page.content.map((content) => (
          <PageItem
            key={content._key}
            content={content as PageItemProps["content"]}
            isPageTitleHero={
              heroOwnsPageTitle && content._key === firstContent?._key
            }
          />
        ))}
    </div>
  );
}
