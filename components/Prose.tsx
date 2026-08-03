import { PortableText } from "next-sanity";
import { type BlockContent } from "@/sanity.types";
import { proseComponents } from "./proseComponents";
import { ProseToc } from "./ProseToc";

export default function Prose({
  body,
  toc = true,
}: {
  body?: BlockContent;
  toc?: boolean;
}) {
  if (!Array.isArray(body) || body.length === 0) {
    return (
      <article className="prose prose-base md:prose-lg prose-primary max-w-none w-full prose-headings:font-dmSerifDisplay prose-p:text-base prose-li:text-base" />
    );
  }

  return (
    <article className="prose prose-base md:prose-lg prose-primary max-w-none w-full prose-headings:font-dmSerifDisplay prose-p:text-base prose-li:text-base">
      {toc && <ProseToc body={body} />}
      <PortableText value={body} components={proseComponents} />
    </article>
  );
}
