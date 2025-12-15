import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GET_ALL_POSTS_QUERY_ASC = defineQuery(`
  *[_type == "post"] | order(publishedAt asc) {
    ...,
    categories[]-> {
      ...,
    }
  }
`);

const GET_ALL_POSTS_QUERY_DESC = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    ...,
    categories[]-> {
      ...,
    }
  }
`);

export async function getAllPosts(direction: "asc" | "desc" = "asc") {
  try {
    const posts = await sanityFetch({
      query: direction === "asc"
        ? GET_ALL_POSTS_QUERY_ASC
        : GET_ALL_POSTS_QUERY_DESC,
    });

    return posts.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);

    return [];
  }
}
