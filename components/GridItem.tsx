import CardGrid from "./CardGrid";
import { Link as LinkType, Card as CardType } from "@/sanity.types";
import Card from "./Card";

export default async function GridItem({ cards }: { cards: CardType[] }) {
  if (!cards) {
    return null;
  }

  return (
    <CardGrid className="p-4 gap-4">
      {cards.map(card => {

        if (!card) {
          return null;
        }

        return (
          <Card
            key={card._id}
            title={card.title || ''}
            image={card.mainImage}
            alt={card.title || ''}
            description={card.description || ''}
            publishedAt={card._createdAt}
            url={card.action && (card.action as unknown as LinkType[]).map(action => {
              return {
                url: action.slug ? `/${action.slug}` : action.url || '',
                title: action.title || '',
              }
            }) || []}
          />
        )
      })}
    </CardGrid>
  )
}