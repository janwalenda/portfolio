import { TextBlock } from "@/sanity.types";
import { PortableText } from "next-sanity";

export default function ContentTextBlock({
  title,
  text
}: TextBlock) {
  return (
    <div className="flex flex-col">
      <h2>{title}</h2>
      <article className="prose max-w-full">
        {Array.isArray(text) && (
          <PortableText value={text} />
        )}
      </article>
    </div>
  )
}