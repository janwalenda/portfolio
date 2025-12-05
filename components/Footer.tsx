import { GET_CONFIG_QUERYResult, Link as LinkType } from "@/sanity.types";
import { FooterColumn, Footer as FooterComponent } from "./ui/footer";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Footer({ config }: { config: NonNullable<GET_CONFIG_QUERYResult> }) {
  return (
    <FooterComponent className="p-10 bg-base-200 text-base-content">
      {config.footerColumns && config.footerColumns.map((column, index) => (
        <FooterColumn key={column._key} title={column.title || ''}>
          {column.links && (column.links as unknown as LinkType[]).map((link) => (
            <Link key={link._id}
              href={link.slug?.current || link.url || ''}
              target={link.url ? '_blank' : '_self'}
              className="link flex flex-row gap-2 items-center"
            >
              {link.icon && <Icon icon={link.icon.name || ''} />}
              <span>{link.title}</span>
            </Link>
          ))}
        </FooterColumn>
      ))}
    </FooterComponent>
  )
}