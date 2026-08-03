import type { Link as LinkType } from "@/sanity.types";
import { Icon } from "@iconify/react";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

export default function Link({ title, icon, slug, url }: LinkProps & LinkType) {
  return (
    <NextLink href={url ? url : slug?.current || ''}>
      {icon ?? (
        <Icon icon={icon} />
      )}
      {title}
    </NextLink>
  )
}