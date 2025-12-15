import { PortableText, PortableTextBlock, toPlainText } from "next-sanity";
import CodeBlock from "./CodeBlock";
import { BlockContent } from "@/sanity.types";
import Image from "@/components/Image";

export default function Prose({ body }: { body?: BlockContent }) {
  return (
    <article className="prose prose-sm md:prose-xl lg:prose-2xl prose-primary max-w-full w-full">

      {Array.isArray(body) && body.length > 0 && (
        <>
          <ul className="list">
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
                h1: ({ children, value }) => <h2 id={value._key}>{children}</h2>,
                h2: ({ children, value }) => <h2 id={value._key}>{children}</h2>,
                h3: ({ children, value }) => <h3 id={value._key}>{children}</h3>,
                h4: ({ children, value }) => <h4 id={value._key}>{children}</h4>,
                h5: ({ children, value }) => <h5 id={value._key}>{children}</h5>,
                h6: ({ children, value }) => <h6 id={value._key}>{children}</h6>,
              },
            }} />
        </>
      )}
    </article>
  )
}