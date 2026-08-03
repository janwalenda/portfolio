import {
  Card as CardComponent,
  CardAction,
  CardBody,
} from "@/components/ui/card";
import Image from "@/components/Image";
import Link from "next/link";
import type { Card as CardType } from "@/sanity.types";
import { H2 } from "./ui/heading";

type CardUrl = { url: string; title: string };

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Card(props: {
  title: string;
  image: CardType["mainImage"];
  description: string;
  publishedAt: string;
  alt: string;
  url: CardUrl | CardUrl[];
}) {
  const { title, image, description, publishedAt, alt, url } = props;
  const urls = Array.isArray(url) ? url : url?.url ? [url] : [];

  return (
    <CardComponent
      cardStyle="border"
      className="bg-base-200 border-base-content"
    >
      {image && (
        <figure className="h-72">
          <Image
            src={image}
            alt={alt}
            width={1000}
            height={1000}
            className="h-full object-cover"
          />
        </figure>
      )}
      <CardBody>
        <H2 className="text-xl font-bold">{title}</H2>
        <div className="w-20 h-1 bg-primary rounded-box" />
        <p>{description}</p>
        <small className="flex flex-col text-xs">
          <time dateTime={publishedAt ?? ""}>
            From:{publishedAt ? formatDate(publishedAt) : "Date not available"}
          </time>
          <time dateTime={publishedAt ?? ""}>
            {publishedAt ? formatTime(publishedAt) : "Date not available"}
          </time>
        </small>
        <CardAction>
          {urls.map((u) => (
            <Link key={u.url} href={u.url} className="btn btn-primary">
              {u.title}
            </Link>
          ))}
        </CardAction>
      </CardBody>
    </CardComponent>
  );
}
