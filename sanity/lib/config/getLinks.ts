import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getLinks() {
  const GET_LINKS_QUERY = defineQuery(`
    *[
      _type == "link"
    ] | order(name asc)
  `);

  try {
    const links = await sanityFetch({
      query: GET_LINKS_QUERY,
      perspective: "published",
    });

    return links.data || null;
  } catch (error) {
    console.error("Error fetching links:", error);

    return null;
  }
}
