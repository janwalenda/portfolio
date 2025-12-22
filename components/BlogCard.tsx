import { GET_ALL_POSTS_QUERY_ASC_RESULT } from "@/sanity.types";
import Card from "./Card";

export default function BlogCard({ post }: { post: GET_ALL_POSTS_QUERY_ASC_RESULT[number] }) {
  return (
    <Card
      key={post._id}
      title={post.title!}
      image={post.mainImage!}
      alt={post.mainImage?.alt || post.title || ''}
      description={post.description!}
      publishedAt={post.publishedAt!}
      url={{
        url: `/blog/${post.slug?.current}`,
        title: 'Read More'
      }}
    />
  )
}