import CardGrid from "./CardGrid";
import { type Link as LinkType, type Card as CardType } from "@/sanity.types";
import Card from "./Card";

export type CardWithExpandedAction = Omit<CardType, "action"> & {
  action?: LinkType[] | null;
}

export default function GridItem({ cards }: { cards: CardWithExpandedAction[] }) {
  if (!cards) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <CardGrid>
        {cards.map(card => {

          if (!card) {
            return null;
          }

          return (
            <Card
              key={card._id}
              title={card.title || ""}
              image={card.mainImage}
              alt={card.title || ""}
              description={card.description || ""}
              publishedAt={card._createdAt}
              url={card.action?.map(action => {
                return {
                  url: action.slug ? `/${action.slug}` : action.url || "",
                  title: action.title || "",
                }
              }) || []}
            />
          )
        })}
      </CardGrid>

    </div>
  )
}
