import { type PortableTextBlock, toPlainText } from "next-sanity";
import { type BlockContent } from "@/sanity.types";

export function ProseToc({ body }: { body: NonNullable<BlockContent> }) {
  return (
    <ul className="not-prose mb-8 list-none space-y-1 border-b border-base-content/20 pb-6 text-base">
      {body.map((block) => {
        if (block._type !== "block" || !block.style?.startsWith("h")) {
          return null;
        }

        return (
          <li key={block._key}>
            <a
              href={`#${block._key}`}
              className="link link-primary text-sm md:text-base"
            >
              {toPlainText(block as PortableTextBlock)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
