import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import generateRssFeed from "@/utils/rss";

export async function GET() {
  const allPosts = await getAllPosts("desc");
  const rssFeed = await generateRssFeed(allPosts);

  return new Response(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}