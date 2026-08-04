import { imageURL } from "@/lib/imageURL";
import { getSanityLinkHref } from "@/lib/sanityLinkHref";
import { type HomepageQueryResult } from "@/sanity.types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { H1 } from "./ui/heading";
import { Hero, HeroContent, HeroOverlay } from "./ui/hero";
import { Button } from "./ui/button";

export default function HomeHeroSection({
  hero,
}: {
  hero: NonNullable<HomepageQueryResult>["heroSection"];
}) {
  if (!hero) {
    return null;
  }

  return (
    <Hero className="min-h-screen w-full relative">
      <HeroOverlay className="bg-linear-to-br from-primary via-secondary to-accent opacity-90" />
      <HeroContent className="flex-col text-center z-10 max-w-4xl px-6">
        <div className="flex flex-col items-center gap-6">
          {hero.badgeEnabled && hero.badgeText && (
            <div className="badge badge-success gap-2 py-3 px-4 text-sm font-medium animate-pulse">
              <span className="w-2 h-2 rounded-full bg-success-content" />
              {hero.badgeText}
            </div>
          )}
          {hero.image && (
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Image
                  src={imageURL(hero.image).url()}
                  alt=""
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
          )}
          {hero.title && (
            <H1 className="text-5xl md:text-7xl font-bold text-base-content drop-shadow-lg">
              {hero.title}
            </H1>
          )}
          {hero.subtitle && (
            <p className="text-xl md:text-2xl text-base-content/90 max-w-2xl">
              {hero.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {hero.primaryCta && (
              <Button asChild size="lg" variant="neutral">
                <Link href={getSanityLinkHref(hero.primaryCta)}>
                  {hero.primaryCta.title}
                </Link>
              </Button>
            )}
            {hero.secondaryCta && (
              <Button asChild size="lg" variant="accent">
                <Link href={getSanityLinkHref(hero.secondaryCta)}>
                  {hero.secondaryCta.icon?.name && (
                    <Icon
                      icon={hero.secondaryCta.icon.name}
                      className="size-5"
                    />
                  )}
                  {hero.secondaryCta.title}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </HeroContent>
    </Hero>
  );
}
