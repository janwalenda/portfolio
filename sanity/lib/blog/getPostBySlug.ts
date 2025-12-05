import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getPostBySlug(slug: string) {
  const POST_BY_SLUG_QUERY = defineQuery(`
    *[
      _type == "post" && slug.current == $slug
    ] | order(publishedAt asc)[0]
  `);

  try {
    const post = await sanityFetch({
      query: POST_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });

    return post.data || null;
  } catch (error) {
    console.log("Error fetching post by slug", error);

    return null;
  }
}