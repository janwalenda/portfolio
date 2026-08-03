import { getActiveSeasonEventById } from "@/sanity/lib/seasonEvent/getActiveSeasonEvent";
import { isActiveSeasonEvent } from "@/lib/isActiveSeasonEvent";
import WinterOverlayClient from "./WinterOverlayClient";

export default async function WinterSeasonEvent() {
  const seasonEvent = await getActiveSeasonEventById("winter");

  if (!seasonEvent) return null;

  if (!isActiveSeasonEvent(seasonEvent)) return null;

  return <WinterOverlayClient seasonEvent={seasonEvent} />;
}
