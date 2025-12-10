import { Card as CardComponent, CardAction, CardBody } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { imageURL } from "@/lib/imageURL";
import type { Card } from "@/sanity.types";

export default function Card({ title, image, description, publishedAt, alt, url }: {
  title: string,
  image: Card['mainImage'],
  description: string,
  publishedAt: string,
  alt: string,
  url: { url: string, title: string } | { url: string, title: string }[]
}) {
  return (
    <CardComponent cardStyle="border" className="bg-base-200 border-base-content">
      {image && (
        <figure className="h-72">
          <Image src={imageURL(image!).width(600).height(600).url()!}
            alt={alt}
            width={600}
            height={600}
            className="w-full"
          />
        </figure>
      )}
      <CardBody>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="w-20 h-1 bg-primary rounded-box" />
        <p>{description}</p>
        <small className="flex flex-col text-xs">
          <time dateTime={publishedAt ?? ''}>
            From:
            {publishedAt
              ? new Date(publishedAt).toLocaleDateString('en-UK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              : 'Date not available'
            }
          </time>
          <time dateTime={publishedAt ?? ''}>
            {publishedAt
              ? new Date(publishedAt).toLocaleTimeString('en-UK', {
                hour: '2-digit',
                minute: '2-digit'
              })
              : 'Date not available'
            }
          </time>
        </small>
        <CardAction>
          {Array.isArray(url) ? url.map((u, i) => (
            <Link key={i} href={u.url || ''} className="btn btn-primary">{u.title}</Link>
          )) : url?.url && (
            <Link href={url.url} className="btn btn-primary">{url.title}</Link>
          )}
        </CardAction>
      </CardBody>
    </CardComponent>
  )
}