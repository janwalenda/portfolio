import { type CardWithExpandedAction } from "./GridItem";
import GridItem from "./GridItem";
import { H2 } from "./ui/heading";

export default function HomeSelectedWorkSection({
  title,
  subtitle,
  projectCards,
}: {
  title?: string | null;
  subtitle?: string | null;
  projectCards: CardWithExpandedAction[];
}) {
  if (!title && projectCards.length === 0) {
    return null;
  }

  return (
    <section id="selected-work" className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {title && <H2 className="text-4xl font-bold mb-4">{title}</H2>}
          {subtitle && (
            <p className="text-lg text-base-content/70">{subtitle}</p>
          )}
        </div>
        {projectCards.length > 0 ? (
          <GridItem cards={projectCards} />
        ) : (
          <div className="text-center text-base-content/50">
            <p>Noch keine Projekte hinterlegt. Schau bald wieder vorbei.</p>
          </div>
        )}
      </div>
    </section>
  );
}
