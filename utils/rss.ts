
import { imageURL } from "@/lib/imageURL";
import { GET_ALL_POSTS_QUERY_DESCResult } from "@/sanity.types";
import RSS from "rss";
import {toHTML} from '@portabletext/to-html'

export default async function generateRssFeed(allPosts: NonNullable<GET_ALL_POSTS_QUERY_DESCResult>) {
  console.log("Generating RSS feed...");

  const site_url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"


  const feedOptions: RSS.FeedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/blog/rss`,
    image_url: allPosts[0].mainImage ? imageURL(allPosts[0].mainImage).url() : "",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    language: "en",
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  allPosts.map((post) => {
    feed.item({
      title: post.title || "",
      description: post.description || "",
      author: "Jan Walenda",
      url: `${site_url}/blog/${post.slug?.current}`,
      date: post.publishedAt
        ? new Date(post.publishedAt)
        : new Date(),
      guid: post._id,
      enclosure: post.mainImage ? {
        url: imageURL(post.mainImage).format("png").url(),
        type: "image/png",
      } : undefined,
      categories: post.categories
        ? post.categories.map((category) => category.title!)
        : [],
      custom_elements: [
        {
          "content:encoded": post.body
            ? toHTML(post.body, {
              components: {
                types: {
                  image: ({ value }) => {
                    return `<img src="${imageURL(value).format("png").url()}" alt="${value.alt}"/>`;
                  },
                  code: ({ value }) => {
                    return `<pre><code>${value.code}</code></pre>`
                  },
                },

              }
            })
            : "",
        }
      ],
    });
  });

  // Write the RSS feed to a file as XML.
  return feed.xml({ indent: true });
}