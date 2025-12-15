import BlogGrid from "@/components/CardGrid";
import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import BlogCard from "@/components/BlogCard";
import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { getConfig } from "@/sanity/lib/config/getConfig";
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";

export async function generateMetadata() {
  const page = await getPageBySlug('blog');
  const config = await getConfig();

  if (!page) {
    return null;
  }

  if (!config) {
    return null;
  }

  return generateSeoMetadata(page.seo, config.defaultSeo, page.title, page.title);
}

export default async function Blog() {
  const posts = await getAllPosts("desc");

  return (
    <div className="
      flex 
      flex-col 
      p-4 
      gap-4 
      items-center 
      justify-center
    ">
      <div className="
        flex 
        flex-col 
        gap-4 
        items-start 
        justify-center
      ">
        <h1 className="text-4xl font-bold">Blog</h1>
        <BlogGrid>
          {posts.map(post => (
            <BlogCard key={post._id} post={post} />
          ))}
        </BlogGrid>
      </div>
    </div>
  );
}