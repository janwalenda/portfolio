import type { PortableTextComponents } from "next-sanity";
import Callout from "./Callout";
import CodeBlock from "./CodeBlock";
import ProseImage from "./ProseImage";
import { H2, H3, H4, H5, H6 } from "./ui/heading";

export const proseComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => <ProseImage value={value} />,
    code: ({ value }) => <CodeBlock value={value} />,
    callout: ({ value }) => <Callout value={value} />,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal">{children}</ol>,
  },
  marks: {
    code: ({ children }) => <code>{children}</code>,
  },
  block: {
    h1: ({ children, value }) => (
      <H2 id={value._key} className="text-2xl md:text-3xl">
        {children}
      </H2>
    ),
    h2: ({ children, value }) => (
      <H2 id={value._key} className="text-2xl md:text-3xl">
        {children}
      </H2>
    ),
    h3: ({ children, value }) => (
      <H3 id={value._key} className="text-xl md:text-2xl">
        {children}
      </H3>
    ),
    h4: ({ children, value }) => (
      <H4 id={value._key} className="text-lg md:text-xl">
        {children}
      </H4>
    ),
    h5: ({ children, value }) => (
      <H5 id={value._key} className="text-base md:text-lg">
        {children}
      </H5>
    ),
    h6: ({ children, value }) => (
      <H6 id={value._key} className="text-base">
        {children}
      </H6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-base-content/80">
        {children}
      </blockquote>
    ),
  },
};
