import CodeBlock from "@/components/CodeBock";
import { imageURL } from "@/lib/imageURL";
import { getPostBySlug } from "@/sanity/lib/blog/getPostBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: Promise<{ post: string }> }) {
  const { post: postSlug } = await params;

  const post = await getPostBySlug(postSlug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="w-20 h-1 bg-primary rounded-box" />
        <p className="text-lg">{post.description}</p>
        {post.mainImage && (
          <div className="hover-3d">
            {/* content */}
            <figure>
              <Image
                src={imageURL(post.mainImage).url()}
                alt={post.mainImage.alt || ""}
                width={post.mainImage.hotspot?.width || 500}
                height={post.mainImage.hotspot?.height || 500}
                className="w-full h-auto"
              />
            </figure>
            {/* 8 empty divs needed for the 3D effect */}
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
        <article className="prose max-w-full">
          {Array.isArray(post.body) && post.body.length > 0 && (
            <PortableText value={post.body} components={{
              types: {
                code: ({ value }) => {
                  return <CodeBlock value={value} />
                }
              }
            }} />
          )}
        </article>
      </div>
    </div>
  );
}