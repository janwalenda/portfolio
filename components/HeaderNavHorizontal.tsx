import { Icon } from "@iconify/react"
import HeaderLinkComponent from "./HeaderLink"
import { Link } from "@/sanity.types"

export default async function HeaderNavHorizontal({ links }: { links: Link[] }) {

  return (
    <nav
      className="max-md:hidden flex not-odd:flex-none max-sm:absolute right-4 z-1 max-sm:border-[1px] max-sm:border-neutral">
      <ul className="menu menu-horizontal max-sm:menu-vertical">
        {links.map((link) => {
          return (
            <HeaderLinkComponent key={link._id} {...link} >
              {link.icon && link.icon.name && <Icon icon={link.icon.name} />}
              {link.title}
            </HeaderLinkComponent>
          )
        })}
      </ul>
    </nav >
  )
} 