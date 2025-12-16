import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GET_ALL_PAGES_QUERY = defineQuery(`
    *[_type == "page"]
`);

export async function getAllPages() {

  try {
    const pages = await sanityFetch({
      query: GET_ALL_PAGES_QUERY,
      perspective: "published",
    });

    return pages.data || [];
  } catch (error) {
    console.log("Error fetching pages:", error);

    return [];
  }
}