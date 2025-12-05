
import { Post } from "@/sanity.types";
import { toHTML } from "@portabletext/to-html";
import fs from "fs";
import RSS from "rss";

export default async function generateRssFeed(allPosts: Post[]) {
  console.log("Generating RSS feed...");

  const site_url =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      : "http://localhost:3000";

  const feedOptions: RSS.FeedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  allPosts.map((post) => {
    feed.item({
      title: post.title || "",
      description: post.description || "",
      author: "Jan Walenda",
      url: `${site_url}/blog/${post.slug?.current}`,
      date: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      custom_elements: [
        {
          "content:encoded": post.body ? toHTML(post.body) : "",
        }
      ]
    });
  });

  // Write the RSS feed to a file as XML.
  return feed.xml({ indent: true });
}