import { type POST_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import Image from "@/components/Image";
import Prose from "@/components/Prose";
import { H1 } from "./ui/heading";

export default function BlogPostArticle({
  post,
}: {
  post: NonNullable<POST_BY_SLUG_QUERY_RESULT>;
}) {
  return (
    <div className="flex flex-col items-center p-4 w-full">
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
