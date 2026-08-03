import ContentHero from "./ContentHero";
import ContentSplitImage from "./ContentSplitImage";
import GridItem, { type CardWithExpandedAction } from "./GridItem";
import { type PageItemProps } from "../lib/pageItemTypes";

export type { PageItemProps };

export default function PageItem({ content }: PageItemProps) {
  if (!content) {
    return null;
  }

  switch (content._type) {
    case "hero": {
      return <ContentHero key={content._key} content={content} />;
    }

    case "splitImage": {
      return <ContentSplitImage key={content._key} content={content} />;
    }

    case "grid": {
      return (
        <GridItem
          key={content._key}
          cards={(content.components || []) as CardWithExpandedAction[]}
        />
      );
    }

    default: {
      return null;
    }
  }
}
