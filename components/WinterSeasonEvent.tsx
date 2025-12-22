import { getActiveSeasonEventById } from "@/sanity/lib/seasonEvent/getActiveSeasonEvent";
import WinterOverlay from "./WinterOverlay";
import { isActiveSeasonEvent } from "@/lib/isActiveSeasonEvent";

export default async function WinterSeasonEvent() {
  const seasonEvent = await getActiveSeasonEventById('winter');

  if (!seasonEvent) return null;


  if (!isActiveSeasonEvent(seasonEvent)) return null;


  return (
    <WinterOverlay seasonEvent={seasonEvent} />
  )
}