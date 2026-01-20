import { PortableText, type PortableTextBlock, toPlainText } from "next-sanity";
import CodeBlock from "./CodeBlock";
import { type BlockContent } from "@/sanity.types";
import Image from "@/components/Image";
import { H2, H3, H4, H5, H6 } from "./ui/heading";

export default function Prose({ body, toc = true }: { body?: BlockContent, toc?: boolean }) {
  return (
    <article className="prose prose-sm md:prose-xl lg:prose-xl prose-primary max-w-full w-full">
      {Array.isArray(body) && body.length > 0 && (
        <>
          {toc && (
            <ul className="list text-xl">
              {body.map((block) => {
                if (block._type !== 'block' || !block.style?.startsWith('h')) {
                  return null;
                }

                return (
                  <li key={block._key}>
                    <a href={`#${block._key}`} className="link link-primary">{toPlainText(block as PortableTextBlock)}</a>
                  </li>
                )
              })}
            </ul>
          )}
          <PortableText value={body}
            components={{
              types: {
                image: ({ value }) => {
                  return <Image src={value}
                    alt={value.alt || ' '}
                    width={2000}
                    height={1600}
                  />
                },
                code: ({ value }) => {
                  return <CodeBlock value={value} />
                },
              },
              list: {
                bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
                number: ({ children }) => <ol className="list-decimal">{children}</ol>,
              },
              block: {
                h1: ({ children, value }) => <H2 id={value._key}>{children}</H2>,
                h2: ({ children, value }) => <H2 id={value._key}>{children}</H2>,
                h3: ({ children, value }) => <H3 id={value._key}>{children}</H3>,
                h4: ({ children, value }) => <H4 id={value._key}>{children}</H4>,
                h5: ({ children, value }) => <H5 id={value._key}>{children}</H5>,
                h6: ({ children, value }) => <H6 id={value._key}>{children}</H6>,
              },
            }} />
        </>
      )}
    </article>
  )
}
