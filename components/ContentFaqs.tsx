import { type BlockContent } from "@/sanity.types";
import Prose from "./Prose";
import { Collapse, CollapseContent, CollapseTitle } from "./ui/collapse";
import { H2 } from "./ui/heading";

type ContentFaq = {
  _key: string;
  title?: string;
  body?: BlockContent;
};

export default function ContentFaqs({
  title,
  faqs,
}: {
  title?: string;
  faqs?: ContentFaq[];
}) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {title && (
          <div className="text-center">
            <H2 className="text-4xl font-bold">{title}</H2>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <Collapse
              key={faq._key}
              className="rounded-box border border-base-content/10 bg-base-200"
            >
              <CollapseTitle className="text-lg">{faq.title}</CollapseTitle>
              <CollapseContent>
                <Prose body={faq.body} toc={false} />
              </CollapseContent>
            </Collapse>
          ))}
        </div>
      </div>
    </section>
  );
}
