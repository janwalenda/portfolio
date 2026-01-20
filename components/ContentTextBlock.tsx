import { TextBlock } from "@/sanity.types";
import { PortableText } from "next-sanity";
import { H2 } from "./ui/heading";

export default function ContentTextBlock({
  title,
  text
}: TextBlock) {
  return (
    <div className="flex flex-col">
      <H2>{title}</H2>
      <article className="prose max-w-full">
        {Array.isArray(text) && (
          <PortableText value={text} />
        )}
      </article>
    </div>
  )
}