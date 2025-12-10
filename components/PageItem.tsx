import { console } from "inspector";
import ContentHero from "./ContentHero";
import ContentSplitImage from "./ContentSplitImage";
import GridItem from "./GridItem";

type PageItemProps = {
  content: {
    _key: string;
    _type: "grid";
    components?: Array<Card>;
  } | {
    _key: string;
    _type: "faqs";
    title?: string;
    faqs?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "faq";
    }>;
  } | {
    _key: string;
    _type: "features";
    title?: string;
    features?: Array<{
      title?: string;
      text?: string;
      _type: "feature";
      _key: string;
    }>;
  } | {
    _key: string;
    _type: "hero";
    title?: string;
    variant?: "accent" | "base" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning";
    text?: BlockContent;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
  } | {
    _key: string;
    _type: "splitImage";
    orientation?: "imageLeft" | "imageRight";
    variant?: "accent" | "base" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning";
    title?: string;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
  }
}

import { BlockContent, Grid, Card, SanityImageCrop, SanityImageHotspot, internalGroqTypeReferenceTo, Page, PageBuilder } from "@/sanity.types"

export default function PageItem({ content }: PageItemProps) {
  if (!content) {
    return null;
  }

  switch (content._type) {
    case "hero": {
      return (
        <ContentHero key={content._key} content={content} />
      )
    }
    case "splitImage": {
      return (
        <ContentSplitImage key={content._key} content={content} />
      )
    }
    case "grid": {
      return (
        <GridItem key={content._key} cards={content.components || []} />
      )
    }
    // case "features": {
    //   return (
    //     <Features key={content._key} features={content.features} />
    //   )
    // }
    // case "faqs": {
    //   return (
    //     <Faqs key={content._key} faqs={content.faqs} />
    //   )
    // }
    // case "textBlock": {
    //   return (
    //     <ContentTextBlock key={content._key} content={content} />
    //   )
    // }
    default: {
      return null;
    }
  }
}