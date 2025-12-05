import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { GET_PAGE_DATA_BY_SLUG_QUERYResult } from "@/sanity.types";

export async function getPageBySlug(slug: string) {
  const GET_PAGE_DATA_BY_SLUG_QUERY = defineQuery(`
    *[_type == "page" && slug.current == $slug][0]{
      ...,
      content[] {
        ...,
      }
    }
  `)

  try {
    const page = await sanityFetch({
      query: GET_PAGE_DATA_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });

    return page.data as GET_PAGE_DATA_BY_SLUG_QUERYResult || null;
  } catch (error) {
    console.log("Error fetching page by slug:", error);

    return null;
  }
}