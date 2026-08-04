import {
  type BlockContent,
  type Card,
  type SanityImageCrop,
  type SanityImageHotspot,
  type internalGroqTypeReferenceTo,
} from "@/sanity.types";

export type PageItemProps = {
  content:
    | {
        _key: string;
        _type: "grid";
        components?: Array<Card>;
      }
    | {
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
      }
    | {
        _key: string;
        _type: "features";
        title?: string;
        features?: Array<{
          title?: string;
          text?: string;
          _type: "feature";
          _key: string;
        }>;
      }
    | {
        _key: string;
        _type: "hero";
        title?: string;
        variant?:
          | "accent"
          | "base"
          | "error"
          | "info"
          | "neutral"
          | "primary"
          | "secondary"
          | "success"
          | "warning";
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
      }
    | {
        _key: string;
        _type: "splitImage";
        orientation?: "imageLeft" | "imageRight";
        variant?:
          | "accent"
          | "base"
          | "error"
          | "info"
          | "neutral"
          | "primary"
          | "secondary"
          | "success"
          | "warning";
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
    | {
        _key: string;
        _type: "textBlock";
        title?: string;
        text?: BlockContent;
      };
};
