import { getConfig } from "@/sanity/lib/config/getConfig";
import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import AnimatedArea from "@/components/AnimatedArea";
import HomeBlogSection from "@/components/HomeBlogSection";
import HomeCtaSection from "@/components/HomeCtaSection";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeSelectedWorkSection from "@/components/HomeSelectedWorkSection";
import Services from "@/components/Services";
import PageItem, { type PageItemProps } from "@/components/PageItem";
import { getHomePageData } from "@/lib/homePageData";

export async function generateMetadata() {
  const page = await getPageBySlug("home");
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
    page.title,
    "/",
  );
}

export default async function Home() {
  const { homepage, latestPosts, projectCards } = await getHomePageData();

  if (!homepage) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center">
        <p className="text-base-content/50">
          Es sind noch keine Inhalte fuer die Startseite konfiguriert.
        </p>
      </div>
    );
  }

  const hero = homepage.heroSection;
  const cta = homepage.ctaSection;

  return (
    <div className="w-full flex flex-col">
      <HomeHeroSection hero={hero} />
      <Services
        title={homepage.servicesTitle ?? undefined}
        subtitle={homepage.servicesSubtitle ?? undefined}
        services={homepage.services ?? undefined}
      />
      <AnimatedArea
        title={homepage.techStackTitle ?? undefined}
        subtitle={homepage.techStackSubtitle ?? undefined}
        technologies={homepage.techStack?.map((tech) => ({
          ...tech,
          name: tech.name ?? undefined,
          icon: tech.icon ?? undefined,
          level: tech.level ?? undefined,
          experience: tech.experience ?? undefined,
          projects: tech.projects ?? undefined,
        }))}
      />
      <HomeSelectedWorkSection
        title={homepage.selectedWorkTitle}
        subtitle={homepage.selectedWorkSubtitle}
        projectCards={projectCards}
      />
      {Array.isArray(homepage.pageBuilder) &&
        homepage.pageBuilder.length > 0 &&
        homepage.pageBuilder.map((content) => (
          <PageItem
            key={content._key}
            content={content as PageItemProps["content"]}
          />
        ))}
      <HomeBlogSection posts={latestPosts} />
      <HomeCtaSection cta={cta} />
    </div>
  );
}
