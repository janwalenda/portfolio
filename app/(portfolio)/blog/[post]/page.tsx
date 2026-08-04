import { getPostBySlug } from "@/sanity/lib/blog/getPostBySlug";
import BlogPostArticle from "@/components/BlogPostArticle";
import JsonLd from "@/components/JsonLd";
import {
  getBlogPostingSchema,
  getBlogPostMetadata,
} from "@/lib/blogPostMetadata";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post: postSlug } = await params;

  return getBlogPostMetadata(postSlug);
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

  return (
    <>
      <JsonLd data={getBlogPostingSchema(post, postSlug)} />
      <BlogPostArticle post={post} />
    </>
  );
}
