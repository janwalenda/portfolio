import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const GET_CONFIG_QUERY = defineQuery(`
  *[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0] {
    ...,
    headerLinks[]-> {
      ...,
      icon {
        ...
      }
    },
    footerColumns[] {
      ...,
      links[]-> {
        ...,
        icon {
          ...
        }
      }
    }
  }
`);

export async function getConfig() {
  try {
    const config = await sanityFetch({
      query: GET_CONFIG_QUERY,
    });

    return config.data || null;
  } catch (error) {
    console.log("Error fetching config:", error);

    return null;
  }
}