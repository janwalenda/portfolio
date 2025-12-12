import { getPostBySlug } from "@/sanity/lib/blog/getPostBySlug";
import Image from "@/components/Image";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { getConfig } from "@/sanity/lib/config/getConfig";
import Prose from "@/components/Prose";

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }) {
  const { post: postSlug } = await params;
  const post = await getPostBySlug(postSlug);
  const config = await getConfig();

  if (!post) {
    return notFound();
  }

  if (!config) {
    return notFound();
  }

  return generateSeoMetadata(post.seo, config.defaultSeo, post.title, post.description);
}

export default async function Post({ params }: { params: Promise<{ post: string }> }) {
  const { post: postSlug } = await params;
  const post = await getPostBySlug(postSlug);

  if (!post) {
    return notFound();
  }

  console.log(post.body);

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="flex flex-col gap-4 max-w-5xl w-full">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="w-20 h-1 bg-primary rounded-box" />
        <p className="text-lg">{post.description}</p>
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
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}

        <Prose body={post.body} />
      </div>
    </div>
  );
}