import { Icon } from "@iconify/react";
import Link from "next/link";
import { type GET_ALL_POSTS_QUERY_DESC_RESULT } from "@/sanity.types";
import BlogCard from "./BlogCard";
import CardGrid from "./CardGrid";
import { H2 } from "./ui/heading";
import { Button } from "./ui/button";

export default function HomeBlogSection({
  posts,
}: {
  posts: NonNullable<GET_ALL_POSTS_QUERY_DESC_RESULT>;
}) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="w-full py-20 px-6 bg-base-200/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <H2 className="text-4xl font-bold mb-4">Aus dem Blog</H2>
          <p className="text-lg text-base-content/70">
            Artikel zu Frontend, CMS-Modernisierung, Performance und technischen
            Entscheidungen.
          </p>
        </div>
        <CardGrid className="w-full mb-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </CardGrid>
        <div className="text-center">
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link href="/blog">
              Alle Beitraege ansehen
              <Icon icon="heroicons:arrow-right" className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
