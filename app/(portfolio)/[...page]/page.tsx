import CmsPageContent from "@/components/CmsPageContent";
import { getCmsPageMetadata } from "@/lib/cmsPageMetadata";
import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page: pageSlug } = await params;

  return getCmsPageMetadata(pageSlug);
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

  return <CmsPageContent page={page} />;
}
