import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GET_GRID_BY_ID_QUERY = defineQuery(`
  *[_type == "grid" && _id == $id][0]{
    ...,
    components[] -> {
      ...,
      action[]->
    }
  }
`)

export async function getGridByID(id: string) {

  try {
    const grid = await sanityFetch({
      query: GET_GRID_BY_ID_QUERY,
      params: {
        id,
      },
    });

    return grid.data || null;
  } catch (error) {
    console.log("Error fetching grid by id:", error);

    return null;
  }
}