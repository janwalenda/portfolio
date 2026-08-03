import type { Link as LinkType } from "@/sanity.types";
import { Icon } from "@iconify/react";
import NextLink from "next/link";

export default function Link({ title, icon, slug, url }: LinkType) {
  return (
    <NextLink href={url ? url : slug?.current || ""}>
      {icon?.name && <Icon icon={icon.name} />}
      {title}
    </NextLink>
  );
}
