import type { Hero as HeroType } from "@/sanity.types";
import { Hero, HeroContent, HeroOverlay } from "@/components/ui/hero";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { imageURL } from "@/lib/imageURL";
import { variant } from "@/lib/variant";
import { cn } from "@/lib/utils";

export default function ContentHero({ content }: { content: HeroType }) {
  return (
    <Hero className="md:min-h-screen w-full relative overflow-hidden">
      <HeroOverlay className={cn("bg-primary", variant({ variant: content.variant }))} />

      <HeroContent className="flex-col gap-0 max-w-6xl w-full p-0">
        {/* Image Section with Gradient Overlay */}
        {content.image && (
          <figure className="relative w-full overflow-hidden shadow-2xl group">
            <Image
              src={imageURL(content.image!).width(1200).height(600).url()}
              width={1200}
              height={600}
              alt={content.title || "Hero image"}
              className="w-full h-auto object-cover"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-100/90" />
          </figure>
        )}

        {/* Content Section with Glassmorphism Effect */}
        <article className={cn(
          "relative z-10 w-full",
          "bg-base-100/95 backdrop-blur-sm",
          "p-6 md:p-10 lg:p-12",
          content.image && "-mt-16 md:-mt-20",
          "shadow-2xl",
          "flex flex-col gap-4",
          "transition-all duration-300"
        )}>
          {/* Title */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight">
            {content.title}
          </h3>

          {/* Decorative Divider */}
          <div className="w-20 h-1 bg-primary rounded-box" />

          {/* Text Content */}
          {Array.isArray(content.text) && (
            <div className="prose prose-lg max-w-none text-base-content/90 leading-relaxed">
              <PortableText value={content.text} />
            </div>
          )}
        </article>
      </HeroContent>
    </Hero>
  )
} 