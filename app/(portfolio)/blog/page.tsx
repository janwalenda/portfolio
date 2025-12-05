import BlogGrid from "@/components/CardGrid";
import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import BlogCard from "@/components/BlogCard";

export default async function Blog() {
  const posts = await getAllPosts("asc");

  return (
    <div className="flex flex-col p-4 gap-4">
      <h1 className="text-4xl font-bold">Blog</h1>
      <BlogGrid>
        {posts.map(post => (
          <BlogCard key={post._id} post={post} />
        ))}
      </BlogGrid>
    </div>
  );
}