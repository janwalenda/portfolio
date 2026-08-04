import { Icon } from "@iconify/react";
import Link from "next/link";
import { getSanityLinkHref } from "@/lib/sanityLinkHref";
import { type HomepageQueryResult } from "@/sanity.types";
import { H2 } from "./ui/heading";
import { Button } from "./ui/button";

export default function HomeCtaSection({
  cta,
}: {
  cta: NonNullable<HomepageQueryResult>["ctaSection"];
}) {
  if (!cta) {
    return null;
  }

  return (
    <section className="w-full py-20 px-6 bg-linear-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto text-center">
        {cta.title && (
          <H2 className="text-4xl md:text-5xl font-bold text-base-100 mb-6">
            {cta.title}
          </H2>
        )}
        {cta.subtitle && (
          <p className="text-xl text-base-100/90 mb-8">{cta.subtitle}</p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          {cta.primaryCta && (
            <Button asChild variant="neutral" size="xl" className="gap-2">
              <Link href={getSanityLinkHref(cta.primaryCta)}>
                {cta.primaryCta.icon?.name && (
                  <Icon icon={cta.primaryCta.icon.name} className="size-6" />
                )}
                {cta.primaryCta.title}
              </Link>
            </Button>
          )}
          {cta.secondaryCta && (
            <Button
              asChild
              variant="accent"
              size="xl"
              buttonStyle="outline"
              className="gap-2 text-base-100 border-base-100 hover:bg-base-100 hover:text-primary"
            >
              <Link href={getSanityLinkHref(cta.secondaryCta)}>
                {cta.secondaryCta.icon?.name && (
                  <Icon icon={cta.secondaryCta.icon.name} className="size-6" />
                )}
                {cta.secondaryCta.title}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
