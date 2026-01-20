import { imageURL } from "@/lib/imageURL";
import { getConfig } from "@/sanity/lib/config/getConfig";
import Image from "next/image";
import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import CardGrid from "@/components/CardGrid";
import BlogCard from "@/components/BlogCard";
import { Hero, HeroContent, HeroOverlay } from "@/components/ui/hero";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import AnimatedArea from "@/components/AnimatedArea";
import Services from "@/components/Services";
import { getHomepage } from "@/sanity/lib/homepage/getHomepage";
import { H1, H2 } from "@/components/ui/heading";
import Link from "next/link";

export async function generateMetadata() {
  const page = await getPageBySlug('home');
  const config = await getConfig();

  if (!page) {
    return null;
  }

  if (!config) {
    return null;
  }

  return generateSeoMetadata(
    page.seo,
    config.defaultSeo,
    page.title,
    page.title
  );
}

export default async function Home() {
  const homepage = await getHomepage();
  const posts = await getAllPosts("desc");
  const postCount = homepage?.selectedWorkCount || 6;
  const latestPosts = posts.slice(0, postCount);

  // If no homepage data, render empty
  if (!homepage) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center">
        <p className="text-base-content/50">No homepage content configured.</p>
      </div>
    );
  }

  const hero = homepage.heroSection;
  const cta = homepage.ctaSection;

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      {hero && (
        <Hero className="min-h-screen w-full relative">
          <HeroOverlay className="bg-linear-to-br from-primary via-secondary to-accent opacity-90" />
          <HeroContent className="flex-col text-center z-10 max-w-4xl px-6">
            <div className="flex flex-col items-center gap-6">
              {/* Availability Badge */}
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
                  <Button
                    asChild
                    size="lg"
                    variant="neutral"
                  >
                    <Link href={hero.primaryCta.url || (hero.primaryCta.slug?.current ? `/${hero.primaryCta.slug.current}` : "#")}>
                      {hero.primaryCta.title}
                    </Link>
                  </Button>
                )}
                {hero.secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="accent"
                  >
                    <Link href={hero.secondaryCta.url || (hero.secondaryCta.slug?.current ? `/${hero.secondaryCta.slug.current}` : "#")}>
                      {hero.secondaryCta.icon?.name && (
                        <Icon icon={hero.secondaryCta.icon.name} className="size-5" />
                      )}
                      {hero.secondaryCta.title}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </HeroContent>
        </Hero>
      )}

      {/* Services Section */}
      <Services
        title={homepage.servicesTitle ?? undefined}
        subtitle={homepage.servicesSubtitle ?? undefined}
        services={homepage.services ?? undefined}
      />

      {/* Tech Stack Section */}
      <AnimatedArea
        title={homepage.techStackTitle ?? undefined}
        subtitle={homepage.techStackSubtitle ?? undefined}
        technologies={homepage.techStack ?? undefined}
      />

      {/* Selected Work Section */}
      {(homepage.selectedWorkTitle || latestPosts.length > 0) && (
        <section id="selected-work" className="w-full py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {homepage.selectedWorkTitle && (
                <H2 className="text-4xl font-bold mb-4">{homepage.selectedWorkTitle}</H2>
              )}
              {homepage.selectedWorkSubtitle && (
                <p className="text-lg text-base-content/70">
                  {homepage.selectedWorkSubtitle}
                </p>
              )}
            </div>

            {latestPosts.length > 0 ? (
              <>
                <CardGrid className="w-full mb-8">
                  {latestPosts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </CardGrid>

                <div className="text-center">
                  <Button asChild variant="default" size="lg" className="gap-2">
                    <Link href="/blog">
                      View All Posts
                      <Icon icon="heroicons:arrow-right" className="size-5" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-base-content/50">
                <p>No projects yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      {cta && (
        <section className="w-full py-20 px-6 bg-linear-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto text-center">
            {cta.title && (
              <H2 className="text-4xl md:text-5xl font-bold text-base-100 mb-6">
                {cta.title}
              </H2>
            )}
            {cta.subtitle && (
              <p className="text-xl text-base-100/90 mb-8">
                {cta.subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center">
              {cta.primaryCta && (
                <Button
                  asChild
                  variant="neutral"
                  size="xl"
                  className="gap-2"
                >
                  <Link href={cta.primaryCta.url || (cta.primaryCta.slug?.current ? `/${cta.primaryCta.slug.current}` : "#")}>
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
                  <Link href={cta.secondaryCta.url || (cta.secondaryCta.slug?.current ? `/${cta.secondaryCta.slug.current}` : "#")}>
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
      )}
    </div>
  );
}