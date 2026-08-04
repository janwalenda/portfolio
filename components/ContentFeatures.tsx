import { type Features } from "@/sanity.types";
import { H2, H3 } from "./ui/heading";

export default function ContentFeatures({
  title,
  features,
}: Pick<Features, "title" | "features">) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {title && (
          <div className="text-center">
            <H2 className="text-4xl font-bold">{title}</H2>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature._key}
              className="rounded-box border border-base-content/10 bg-base-200 p-6"
            >
              {feature.title && <H3 className="mb-3 text-2xl">{feature.title}</H3>}
              {feature.text && (
                <p className="text-base leading-relaxed text-base-content/75">
                  {feature.text}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
