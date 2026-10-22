import { type GET_ALL_POSTS_QUERY_ASC_RESULT } from "@/sanity.types";
import Card from "./Card";

export default function BlogCard({
  post,
  titleAs = "h2",
}: {
  post: GET_ALL_POSTS_QUERY_ASC_RESULT[number];
  titleAs?: "h2" | "h3";
}) {
  const title = post.title || "";

  return (
    <Card
      key={post._id}
      title={title}
      image={post.mainImage!}
      alt={
        post.mainImage?.alt && post.mainImage.alt !== post.title
          ? post.mainImage.alt
          : ""
      }
      description={post.description!}
      publishedAt={post.publishedAt!}
      titleAs={titleAs}
      url={{
        url: `/blog/${post.slug?.current}`,
        title: "Weiterlesen",
        ariaLabel: title ? `Weiterlesen: ${title}` : "Weiterlesen",
      }}
    />
  );
}
