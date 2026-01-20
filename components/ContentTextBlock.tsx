import { type TextBlock } from "@/sanity.types";
import { H2 } from "./ui/heading";
import Prose from "./Prose";

export default function ContentTextBlock({
  title,
  text
}: TextBlock) {
  return (
    <div className="flex flex-col">
      <H2>{title}</H2>
      <article className="prose max-w-full">
        <Prose body={text} toc={false} />
      </article>
    </div>
  )
}
