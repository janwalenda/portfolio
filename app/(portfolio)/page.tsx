import { imageURL } from "@/lib/imageURL";
import { getConfig } from "@/sanity/lib/config/getConfig";
import Image from "next/image";
import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import CardGrid from "@/components/CardGrid";
import BlogCard from "@/components/BlogCard";
import { Hero, HeroContent, HeroOverlay } from "@/components/ui/hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";

export async function generateMetadata() {
  const page = await getPageBySlug('home');
  const config = await getConfig();

  if (!page) {
    return null;
  }

  if (!config) {
    return null;
  }

  return generateSeoMetadata(page.seo, config.defaultSeo, page.title, page.title);
}

export default async function Home() {
  const config = await getConfig();
  const posts = await getAllPosts("desc");
  const latestPosts = posts.slice(0, 6);

  // Tech stack for the developer
  const technologies = [
    { name: "React", icon: "logos:react" },
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "Sanity CMS", icon: "simple-icons:sanity" },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <Hero className="min-h-screen w-full relative">
        <HeroOverlay className="bg-linear-to-br from-primary via-secondary to-accent opacity-90" />
        <HeroContent className="flex-col text-center z-10 max-w-4xl px-6">
          <div className="flex flex-col items-center gap-6">
            {config?.headerLogo && (
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image
                    src={imageURL(config.headerLogo).url()}
                    alt={config?.headerLogoAlt || ""}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <h1 className="text-5xl md:text-7xl font-bold text-base-content drop-shadow-lg">
              {config?.title || "Jan Walenda"}
            </h1>

            <p className="text-xl md:text-2xl text-base-content/90 max-w-2xl">
              {config?.description || "Full-Stack Developer & Creative Problem Solver"}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Button asLink href="/blog" size="lg" variant="neutral">
                <Icon icon="heroicons:book-open" className="size-5" />
                View Blog
              </Button>
              <Button asLink href="#latest-posts" size="lg" variant="accent">
                <Icon icon="heroicons:arrow-down" className="size-5" />
                Explore Work
              </Button>
            </div>
          </div>
        </HeroContent>
      </Hero>

      {/* Skills & Technologies Section */}
      <section className="w-full py-20 px-6 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-lg text-base-content/70">
              Tools and frameworks I work with
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {technologies.map((tech) => (
              <Badge
                key={tech.name}
                size="lg"
                className="gap-2 px-6 py-4 bg-base-200 border-base-content text-base-content"
              >
                <Icon icon={tech.icon} className="size-6" />
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section id="latest-posts" className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-lg text-base-content/70">
              Thoughts, tutorials, and insights from my journey
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <>
              <CardGrid className="w-full mb-8">
                {latestPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </CardGrid>

              <div className="text-center">
                <Button asLink href="/blog" variant="default" size="lg" className="gap-2">
                  View All Posts
                  <Icon icon="heroicons:arrow-right" className="size-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-base-content/50">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 px-6 bg-linear-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-base-100 mb-6">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-xl text-base-100/90 mb-8">
            Interested in working together or have a question? Feel free to reach out!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asLink href="mailto:kontakt@janwalenda.de?subject=Hello Jan" variant="neutral" size="xl" className="gap-2">
              <Icon icon="heroicons:envelope" className="size-6" />
              Get in Touch
            </Button>
            <Button asLink href="/about-me" variant="accent" size="xl" buttonStyle="outline" className="gap-2 text-base-100 border-base-100 hover:bg-base-100 hover:text-primary">
              <Icon icon="heroicons:document-text" className="size-6" />
              Read More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}