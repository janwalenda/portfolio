import { Icon } from "@iconify/react"
import HeaderLinkComponent from "./HeaderLink"
import { Link } from "@/sanity.types"

export default async function HeaderNavVertical({ links }: { links: Link[] }) {

  return (
    <details className="sm:hidden">
      <summary className="btn btn-ghost">
        <Icon icon="heroicons:bars-3-solid" className="size-5" />
      </summary>
      <nav className="flex not-odd:flex-none absolute right-4 bg-base-100 z-10 border-[1px] border-neutral">
        <ul className="menu menu-vertical">
          {links.map((link) => {
            return (
              <HeaderLinkComponent key={link._id} {...link} >
                {link.icon && link.icon.name && <Icon icon={link.icon.name} />}
                {link.title}
              </HeaderLinkComponent>
            )
          })}
        </ul>
      </nav>
    </details>
  )
} 