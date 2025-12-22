import { SeasonEvent } from "@/sanity.types";

export function isActiveSeasonEvent(seasonEvent: SeasonEvent) {
  const today = new Date();

  if (!seasonEvent.endDate || !seasonEvent.startDate) {
    return false;
  }

  return today >= new Date(seasonEvent.startDate)
    && today <= new Date(seasonEvent.endDate);
}