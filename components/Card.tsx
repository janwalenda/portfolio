import {
  Card as CardComponent,
  CardAction,
  CardBody,
} from "@/components/ui/card";
import Image from "@/components/Image";
import Link from "next/link";
import type { Card as CardType } from "@/sanity.types";
import { formatDate, formatTime } from "@/lib/formatDateTime";
import { H2, H3 } from "./ui/heading";

type CardUrl = { url: string; title: string; ariaLabel?: string };

export default function Card(props: {
  title: string;
  image: CardType["mainImage"];
  description: string;
  publishedAt: string;
  alt: string;
  url: CardUrl | CardUrl[];
  /** Use h3 when the card sits under a section h2 (e.g. homepage). */
  titleAs?: "h2" | "h3";
}) {
  const {
    title,
    image,
    description,
    publishedAt,
    alt,
    url,
    titleAs = "h2",
  } = props;
  const urls = Array.isArray(url) ? url : url?.url ? [url] : [];
  const Title = titleAs === "h3" ? H3 : H2;

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
        <Title className="text-xl font-bold">{title}</Title>
        <div className="w-20 h-1 bg-primary rounded-box" />
        <p>{description}</p>
        <small className="flex flex-col text-xs">
          <time dateTime={publishedAt ?? ""}>
            Datum: {publishedAt ? formatDate(publishedAt) : "Kein Datum"}
          </time>
          <time dateTime={publishedAt ?? ""}>
            {publishedAt ? formatTime(publishedAt) : "Keine Uhrzeit"}
          </time>
        </small>
        <CardAction>
          {urls.map((u) => (
            <Link
              key={u.url}
              href={u.url}
              className="btn btn-primary"
              aria-label={u.ariaLabel}
            >
              {u.title}
            </Link>
          ))}
        </CardAction>
      </CardBody>
    </CardComponent>
  );
}
