import Image from "@/components/Image";
import PageItem, { type PageItemProps } from "@/components/PageItem";
import { H1 } from "@/components/ui/heading";
import { type getPageBySlug } from "@/sanity/lib/page/getPageBySlug";

type CmsPage = NonNullable<Awaited<ReturnType<typeof getPageBySlug>>>;

export default function CmsPageContent({ page }: { page: CmsPage }) {
  const firstContent = Array.isArray(page.content) ? page.content[0] : null;
  const heroOwnsPageTitle =
    firstContent?._type === "hero" &&
    Boolean(firstContent.title) &&
    firstContent.title === page.title;

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center relative p-4">
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
        page.content.map((content) => {
          const hideRedundantTextTitle =
            content._type === "textBlock" &&
            Boolean(page.title) &&
            content.title === page.title;

          return (
            <PageItem
              key={content._key}
              content={content as PageItemProps["content"]}
              isPageTitleHero={
                heroOwnsPageTitle && content._key === firstContent?._key
              }
              hideTextBlockTitle={hideRedundantTextTitle}
            />
          );
        })}
    </div>
  );
}
