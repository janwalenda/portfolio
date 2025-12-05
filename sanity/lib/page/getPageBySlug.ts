import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GET_PAGE_DATA_BY_SLUG_QUERY = defineQuery(`
    *[_type == "page" && slug.current == $slug][0]{
      ...,
      content[] {
        _key,
        _type,
        _type == "hero" => {
          ...,
        },
        _type == "splitImage" => {
          ...,
        },
        _type == "features" => {
          ...,
        },
        _type == "faqs" => {
          ...,
          faqs[]->
        },
        _type == "grid" => {
          ...,
          components[]-> {
            ...,
            action[]->,
          }
        },
        _type == "textBlock" => {
          ...,
        }
      }
    }
`);

export async function getPageBySlug(slug: string) {

  try {
    const page = await sanityFetch({
      query: GET_PAGE_DATA_BY_SLUG_QUERY,
      perspective: "published",

      params: {
        slug,
      },
    });

    return page.data || null;
  } catch (error) {
    console.log("Error fetching page by slug:", error);

    return null;
  }
}