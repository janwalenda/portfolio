import { type Link as HeaderLink } from "@/sanity.types"
import Link from "next/link";

type HeaderLinkProps = HeaderLink & { children: React.ReactNode };

export default function HeaderLink({ url, slug, children }: HeaderLinkProps) {
  if(slug && slug.current) {
    return (
      <li>
        <Link href={`/${slug.current}`} className="link no-underline">
          \ {children}
        </Link>
      </li>
    )
  }

  if(url && url.startsWith('https')) {
    return (
      <li>
        <Link href={url} className="link no-underline">
          \ {children}
        </Link>
      </li>
    )
  }

  return null;
}