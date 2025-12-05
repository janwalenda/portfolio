import { Post } from "@/sanity.types";
import { Card, CardAction, CardBody } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { imageURL } from "@/lib/imageURL";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Card cardStyle="border" key={post._id} className="bg-base-200 border-base-content">
      {post.mainImage && (
        <figure className="h-72">
          <Image src={imageURL(post.mainImage!).width(600).height(600).url()!}
            alt={post.mainImage!.alt!}
            width={600}
            height={600}
            className="w-full"
          />
        </figure>
      )}
      <CardBody>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <div className="w-20 h-1 bg-primary rounded-box" />
        <p>{post.description}</p>
        <small className="flex flex-col text-xs">
          <time dateTime={post.publishedAt ?? ''}>
            From:
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })
              : 'Date not available'
            }
          </time>
          <time dateTime={post.publishedAt ?? ''}>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' })
              : 'Date not available'
            }
          </time>
        </small>
        <CardAction>
          <Link className="btn btn-primary" href={`/blog/${post.slug?.current}`}>Read More</Link>
        </CardAction>
      </CardBody>
    </Card>
  )
}