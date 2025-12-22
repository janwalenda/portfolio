import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { isActiveSeasonEvent } from "@/lib/isActiveSeasonEvent";

const GET_ACTIVE_SEASON_EVENT_BY_ID = defineQuery(`
  *[_type == "seasonEvent" && defined(_id) && id == $id][0]
`);

export async function getActiveSeasonEventById(id: string) {

  try {
    const seasonEvent = await sanityFetch({
      query: GET_ACTIVE_SEASON_EVENT_BY_ID,
      perspective: "published",
      params: {
        id,
      },
    });

    if (!seasonEvent.data || !isActiveSeasonEvent(seasonEvent.data)) return null;

    return seasonEvent.data;
  } catch (error) {
    console.log("Error fetching season event by id:", error);

    return null;
  }
}